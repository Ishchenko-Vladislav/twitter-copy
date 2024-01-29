import prisma from "@/lib/prisma";
import { auth } from "./auth";
const serverAuth = async () => {
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
