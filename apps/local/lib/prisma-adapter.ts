import { PrismaClient } from '@prisma/client';
import { DatabaseAdapter, Message, Conversation } from '@fullmoon/database';

const prisma = new PrismaClient();

export class PrismaAdapter implements DatabaseAdapter {
  async createConversation(conversation: Omit<Conversation, 'id'>): Promise<Conversation> {
    return prisma.conversation.create({
      data: conversation,
    });
  }

  async getConversation(id: string): Promise<Conversation | null> {
    return prisma.conversation.findUnique({
      where: { id },
    });
  }

  async listConversations(): Promise<Conversation[]> {
    return prisma.conversation.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async updateConversation(id: string, data: Partial<Conversation>): Promise<Conversation> {
    return prisma.conversation.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async deleteConversation(id: string): Promise<void> {
    await prisma.conversation.delete({
      where: { id },
    });
  }

  async createMessage(message: Omit<Message, 'id'>): Promise<Message> {
    return prisma.message.create({
      data: message,
    });
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async deleteMessage(id: string): Promise<void> {
    await prisma.message.delete({
      where: { id },
    });
  }
} 