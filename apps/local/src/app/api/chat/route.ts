import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { prisma } from "@/lib/prisma";

const openai = createOpenAI({
  baseURL: process.env.LLM_BASE_URL,
});

export async function POST(req: Request) {
  const { messages, conversationId } = await req.json();
  console.log("Conversation ID:", conversationId);
  const userMessage = messages[messages.length - 1];
  console.log("User Message:", userMessage);

  if (conversationId) {
    await prisma.message.create({
      data: {
        content: userMessage.content,
        role: "user",
        conversationId,
      },
    });
  }

  const result = streamText({
    model: openai("mlx-community/Llama-3.2-3B-Instruct-4bit"),
    messages,
    maxSteps: 5,
    async onFinish({ text }) {
      if (conversationId) {
        await prisma.message.create({
          data: {
            content: text,
            role: "assistant",
            conversationId,
          },
        });
      }
    },
  });

  return result.toDataStreamResponse();
}
