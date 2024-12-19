import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: params.id,
    },
    include: {
      messages: true,
    },
  });

  return NextResponse.json(conversation);
}
