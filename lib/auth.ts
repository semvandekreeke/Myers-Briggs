import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "./prisma";

/**
 * NextAuth configuration.
 *
 * Providers are added conditionally based on which environment variables are
 * present, so the app builds and runs even when auth isn't configured (the UI
 * then operates in local-only mode). Configure any of:
 *   - GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET   (Google login)
 *   - EMAIL_SERVER / EMAIL_FROM                 (passwordless email login)
 */
const providers: NextAuthOptions["providers"] = [];

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
  session: { strategy: "database" },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // Expose the user id and MBTI type on the session for the client.
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.mbtiType = (user as { mbtiType?: string | null }).mbtiType ?? null;
      }
      return session;
    },
  },
};

/** True when at least one auth provider is configured. */
export const isAuthConfigured = (): boolean => providers.length > 0;
