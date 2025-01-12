import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const openai = createOpenAI({
  baseURL: process.env.LLM_BASE_URL,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("mlx-community/Llama-3.2-3B-Instruct-4bit"),
    messages,
    maxSteps: 5,
  });

  return result.toDataStreamResponse();
}
