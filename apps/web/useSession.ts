
import { headers } from "next/headers";
import { Session } from "./lib/auth-client";

export async function getSession(): Promise<Session | null> {
  const res = await fetch("http://localhost:3000/api/me", {
    headers: await headers(),
  });
  
  if (!res.ok) return null;

  const data = (await res.json()) as Session;
  return data;
}