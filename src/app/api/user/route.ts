import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        isError: true,
        message: "You should be logged in.",
      });
    }
    const following = await prisma.user.findFirst({
      where: { id: session.user.id },
      select: {
        followers: {
          select: {
            recipientId: true,
          },
        },
      },
    });
    const ids = following?.followers.map((el) => el.recipientId) ?? [];
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: {
            in: [...ids, session?.user.id],
          },
        },
      },
      take: 3,
      // select: {
      //   avatar: true,
      // },
      select: {
        id: true,
        avatar: true,
        name: true,
        username: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
      // include: {
      //   _count: {
      //     select: {
      //       followers: true,
      //       following: true,
      //     },
      //   },
      // },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log("ERROR WHEN FETCH USERS");
    return NextResponse.json("something went wrong", { status: 400 });
  }
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()

  // return Response.json({ data })
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        isError: true,
        message: "You should be logged in.",
      });
    }
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: data,
    });
    return NextResponse.json(
      {
        message: "Successfully updated",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 400 });
  }
}
