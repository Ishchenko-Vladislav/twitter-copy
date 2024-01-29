import NextAuth, { getServerSession } from "next-auth";
import type { AuthOptions, Awaitable, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { User } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { nextAuthOptions } from "@/lib/auth-options";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
