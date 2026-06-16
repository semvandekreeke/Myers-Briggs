import type { DefaultSession } from "next-auth";

/**
 * Augment NextAuth's types to include the fields we carry on the session and
 * the JWT (lib/auth.ts).
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      mbtiType?: string | null;
    } & DefaultSession["user"];
  }

  // Returned by the Credentials `authorize` callback.
  interface User {
    mbtiType?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    mbtiType?: string | null;
  }
}
