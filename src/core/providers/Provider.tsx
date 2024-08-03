"use client";

import type { NextAuthProviderInterface } from "@/resource/types/types";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children }: NextAuthProviderInterface) {
  return <SessionProvider>{children}</SessionProvider>;
};