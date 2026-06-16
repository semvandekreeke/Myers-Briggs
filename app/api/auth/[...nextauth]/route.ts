import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth route handler (App Router). Handles sign-in, callback, session,
 * and sign-out for all configured providers.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
