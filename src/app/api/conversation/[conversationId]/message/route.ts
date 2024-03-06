import { auth } from "@/lib/auth";
import { BaseResponse } from "@/lib/interface";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export type MessageResponse = Prisma.MessageGetPayload<{}>;
import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
// export interface GetMessageResponse extends MessageResponse[] {}

export async function GET(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
): Promise<NextResponse<MessageResponse[] | BaseResponse<null>>> {
  try {
    const conversationId = parseInt(params.conversationId);
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "You should be logged in.",
        data: null,
      });
    }
    const searchParams = req.nextUrl.searchParams;
    const take = parseInt(searchParams.get("take") ?? "10");
    const date = searchParams.get("date") ?? new Date(Date.now());
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
        createdAt: {
          lte: date,
        },
      },
      take: take,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Try again!",
      data: null,
    });
  }
}

export interface CreateMessageDTO {
  conversationId: string;
  text: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
): Promise<NextResponse<any>> {
  try {
    const data = await req.json();
    const conversationId = parseInt(params.conversationId);
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "You should be logged in.",
        data: null,
      });
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        userId: session.user.id,
        text: data.text,
      },
    });
    const conversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageSendId: message.id,
      },
    });
    pusherServer.trigger("message", "new_message", message);
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Try again!",
      data: null,
    });
  }
}
