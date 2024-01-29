import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// import { auth } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    // const { currentUser } = await serverAuth(req);
    const currentUser = await auth();
    const following = await prisma.follows.findMany({
      where: {
        userId: currentUser?.user.id,
      },
      // include: {
      //   recipient: true,
      //   user: true,
      // },
    });
    return NextResponse.json(following);
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const { recipientId } = await req.json();
    if (!recipientId) {
      return NextResponse.json("Provide recipientId", { status: 400 });
    }
    // const currentUser = await getServerSession();
    const { currentUser } = await serverAuth();
    const recipient = await prisma.user.findUnique({
      where: {
        id: recipientId,
      },
    });
    // console.log("CURRENT USER", currentUser);
    if (!currentUser) {
      return NextResponse.json("Not signed in", { status: 400 });
    }
    if (!recipient) {
      return NextResponse.json("This user does't exist", { status: 400 });
    }
    // const existFollow = await prisma.follows.findFirst({
    //   where: {
    //     userId: currentUser.id,
    //     recipientId: recipient.id,
    //   },
    // });
    // if (existFollow) {
    //   const follow = await prisma.follows.delete({
    //     where: {
    //       id: existFollow.id,
    //     },
    //   });
    //   return NextResponse.json(follow);
    // } else {
    //   const follow = await prisma.follows.create({
    //     data: {
    //       recipientId: recipientId,
    //       userId: currentUser.id,
    //     },
    //   });
    //   return NextResponse.json(follow);
    // }
    const follow = await prisma.follows.create({
      data: {
        recipientId: recipientId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(follow);
  } catch (error) {
    return NextResponse.json(`something went wrong ${error}}`, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { recipientId } = await req.json();
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json("Not signed in", { status: 400 });
    }

    const follow = await prisma.follows.deleteMany({
      where: {
        userId: currentUser.id,
        recipientId: recipientId,
      },
    });
    return NextResponse.json({ status: 200, message: "deleted" });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

// export default { GET, POST };
