import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export default async function GET(req: NextApiRequest) {
  try {
    // const currentSession = await getServerSession();
    // const currentUser = await prisma.user.findUnique({
    //   where: {
    //     id: currentSession?.user.id,
    //   },
    // });
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 400 });
  }
}
