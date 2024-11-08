import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { account, session, user, verification } from "./db/schema";
import { db } from "./db/drizzle";

// const prisma = new PrismaClient();
export const auth = betterAuth({
  // database: prismaAdapter(prisma, {
  //   provider: "postgresql", // or "mysql", "postgresql", ...etc
  // }),
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite",
    schema: {
      account,
      session,
      user,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, //defaults to true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: [process.env.TRUSTED_ORIGINS!], // Replace with the URL of your client-side application}
});
