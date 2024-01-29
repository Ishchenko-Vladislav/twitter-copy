import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({});
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
    const { currentUser } = await serverAuth();
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
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
