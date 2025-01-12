import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages, conversationId, customEndpoint } = await req.json();
  console.log("Conversation ID:", conversationId);
  const userMessage = messages[messages.length - 1];
  console.log("User Message:", userMessage);
  console.log("Custom Endpoint:", customEndpoint);

  const baseURL = customEndpoint || process.env.LLM_BASE_URL;

  const openai = createOpenAI({
    baseURL,
  });

  const result = streamText({
    model: openai("mlx-community/Llama-3.2-3B-Instruct-4bit"),
    messages,
    maxSteps: 5,
  });

  return result.toDataStreamResponse();
}
