import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages, conversationId, customEndpointSettings } = await req.json();
  console.log("Conversation ID:", conversationId);
  const userMessage = messages[messages.length - 1];
  console.log("User Message:", userMessage);
  console.log("Custom Endpoint Settings:", customEndpointSettings);

  const baseURL = customEndpointSettings?.endpoint || process.env.LLM_BASE_URL;

  const openai = createOpenAI({
    baseURL,
  });

  try {
    const result = streamText({
      model: openai(customEndpointSettings?.modelName || "llama3.2:1b"),
      messages,
      maxSteps: 5,
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error", { status: 500 });
  }
}
