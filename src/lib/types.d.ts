import type { User } from "@prisma/client";
import type { DefaultSession } from "next-auth";
import type { DefaultJWT, JWT } from "next-auth/jwt";
// import type { DefaultJWT, JWT } from "next-auth/";
// import type { useSession } from "next-auth/react";
// import { DefaultContext } from "react-icons/lib";
// import { string } from "zod";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
  // interface
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    avatar: string | null
  }
  // interface JWT {
  //   user: User
  // }
  // type JWT = {
  //   name: string;
  //   email: string;
  //   username: string;
  //   sub: string;
  //   iat: number;
  //   exp: number;
  //   jti: string;
  // };
  // type User = User;
}
