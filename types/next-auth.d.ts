import type { DefaultSession } from "next-auth";

/**
 * Augment NextAuth's Session type to include the fields we expose in the
 * `session` callback (lib/auth.ts).
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      mbtiType?: string | null;
    } & DefaultSession["user"];
  }
}
