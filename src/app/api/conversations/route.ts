import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const conversation = await prisma.conversation.create({
    data: {
      title: message.content.slice(0, 80), // Use first 100 chars as title
    },
  });

  return NextResponse.json(conversation);
}

export async function GET() {
  const conversations = await prisma.conversation.findMany({
    include: {
      messages: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(conversations);
}
