import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
import { prisma } from "@repo/db";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";


const options = {
  baseURL: "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000", 
    "http://localhost:3001", 
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      firstLogin: {
        type: "boolean",
        input: false,
        defaultValue: true
      }
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: { 
      prompt: "select_account", 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
  }, 
  },
  plugins: [

  ]
} satisfies BetterAuthOptions;



export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      return {
        user,
        session
      }
    }, options),
  ]
});

export type Session = typeof auth.$Infer.Session
console.log("Auth instance created successfully");