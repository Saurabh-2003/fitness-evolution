// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  trustHost: true,
  pages: {
    signIn: "/signin",
    newUser: "/signup",
    error: "/error",
    signOut: "/signout",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export default authOptions;
