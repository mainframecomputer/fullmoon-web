import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  role: z.enum(['user', 'assistant']),
  conversationId: z.string(),
  createdAt: z.date(),
});

export const ConversationSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;

export interface DatabaseAdapter {
  // Conversation methods
  createConversation(conversation: Omit<Conversation, 'id'>): Promise<Conversation>;
  getConversation(id: string): Promise<Conversation | null>;
  listConversations(): Promise<Conversation[]>;
  updateConversation(id: string, data: Partial<Conversation>): Promise<Conversation>;
  deleteConversation(id: string): Promise<void>;

  // Message methods
  createMessage(message: Omit<Message, 'id'>): Promise<Message>;
  getMessages(conversationId: string): Promise<Message[]>;
  deleteMessage(id: string): Promise<void>;
} 