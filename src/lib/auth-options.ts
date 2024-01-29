import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Awaitable, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { GoogleProfile } from "next-auth/providers/google";
import type { User } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
export const nextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile: GoogleProfile, tokens): Awaitable<User> {
        // console.log("REGISTER PROFILE", profile);
        // return profile;
        const username = profile.email.split("@")[0];
        return {
          id: profile?.sub,
          email: profile.email,
          name: profile.name,
          emailVerified: profile.email_verified,
          password: null,
          // createdAt: new Date(Date.now()),
          username,
        } as User;
        // return {
        //   id: profile.
        // }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log("AUTH HERE");
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("This user does't exist");
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        // const isCorrectPassword = credentials.password === user.password;
        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, email, account, credentials }) {
      // console.log("signIn ---", user, profile, email, account, credentials);
      return true;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("signIn --------------", credentials, user, account,p);

    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async jwt({ token, user, account, profile, isNewUser, session, trigger }) {
      // console.log("JWT --------------", token, user, account, session, profile);
      if (trigger === "update") {
        return { ...token, ...session };
      }
      if (user) {
        token.username = (user as User).username;
        token.avatar = (user as User).avatar;
      }

      return token;
    },
    async session({ session, user, token, newSession }) {
      // console.log("SESSION --------------", token, user, newSession, session);

      session.user.username = token.username;
      session.user.email = token.email as any;
      session.user.name = token.name as any;
      session.user.avatar = token.avatar;
      session.user.id = token.sub!;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
