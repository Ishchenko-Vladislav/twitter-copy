import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { auth } from "@/app/api/auth/[...nextauth]/route";
const serverAuth = async () => {
  //   const session = await getSession({ req });
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }
  const currentUser = await prisma?.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return {
    currentUser,
  };
};

export default serverAuth;
