import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import { prisma } from "@/lib/prisma";

const openai = createOpenAI({
  baseURL: "http://localhost:11434/v1",
});

export async function POST(req: Request) {
  const { messages, conversationId } = await req.json();
  // const coreMessages = convertToCoreMessages(messages);

  const result = streamText({
    model: openai("llama3.2:1b"),
    messages,
    maxSteps: 5,
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      console.log("streamText text", text);
      console.log("conversationId", conversationId);
      if (conversationId) {
        await prisma.message.createMany({
          data: [
            {
              content: messages[messages.length - 1].content,
              role: "user",
              conversationId: conversationId,
            },
            {
              content: text,
              role: "assistant",
              conversationId: conversationId,
            },
          ],
        });
      }
      // await saveChat({ text, toolCalls, toolResults });
    },
  });

  return result.toDataStreamResponse();
}
