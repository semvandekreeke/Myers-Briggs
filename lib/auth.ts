import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

/**
 * NextAuth configuration.
 *
 * Primary provider: email + password (Credentials). Because the Credentials
 * provider cannot use database sessions, the whole app uses JWT sessions — the
 * user id and MBTI type are carried in the token and surfaced on the session.
 * User rows (with bcrypt-hashed passwords) still live in Postgres, so a user
 * signing in on any device gets the same saved results.
 *
 * Google / email-link providers remain available and activate automatically if
 * their env vars are set (see .env.example), composing with JWT sessions.
 */
const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      const user = await prisma.user.findUnique({
        where: { email: credentials.email.toLowerCase() },
      });
      // No user, or an OAuth-only account without a password set.
      if (!user?.password) return null;

      const valid = await bcrypt.compare(credentials.password, user.password);
      if (!valid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        mbtiType: user.mbtiType,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
  providers.push(
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  // Credentials sign-in requires JWT sessions (not database sessions).
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // Persist id + MBTI type on the token at sign-in.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.mbtiType = (user as { mbtiType?: string | null }).mbtiType ?? null;
      }
      return token;
    },
    // Expose them on the session for the client.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? "";
        session.user.mbtiType = (token.mbtiType as string | null) ?? null;
      }
      return session;
    },
  },
};

/** Always true now — email+password is always available. */
export const isAuthConfigured = (): boolean => providers.length > 0;
