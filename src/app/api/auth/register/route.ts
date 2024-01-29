import prisma from "@/lib/prisma";
// import bcrypt, { hash } from "bcrypt";
// import {} from 'crypto-js'
// import argon from "argon2";
import bcrypt from "bcrypt";
import { type NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { email, username, name, password } = await request.json();
    console.log("HERE REGISTER", email, password);
    const isExistUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (isExistUser) {
      return new NextResponse("This user already exist", {
        status: 404,
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        password: hashPassword,
      },
    });

    return NextResponse.json({ status: "ok", user });
    // return Response.json({
    //   user,
    // });
  } catch (error) {
    return new NextResponse("Something went wrong", {
      status: 404,
    });
  }
}
