import { openDB, DBSchema } from 'idb';
import { DatabaseAdapter, Message, Conversation } from '@fullmoon/database';
import { v4 as uuidv4 } from 'uuid';

interface FullmoonDB extends DBSchema {
  conversations: {
    key: string;
    value: Conversation;
    indexes: { 'by-updated': Date };
  };
  messages: {
    key: string;
    value: Message;
    indexes: { 'by-conversation': string };
  };
}

const DB_NAME = 'fullmoon-db';
const DB_VERSION = 1;

async function getDB() {
  return openDB<FullmoonDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const conversationStore = db.createObjectStore('conversations', { keyPath: 'id' });
      conversationStore.createIndex('by-updated', 'updatedAt');

      const messageStore = db.createObjectStore('messages', { keyPath: 'id' });
      messageStore.createIndex('by-conversation', 'conversationId');
    },
  });
}

export class IndexedDBAdapter implements DatabaseAdapter {
  async createConversation(conversation: Omit<Conversation, 'id'>): Promise<Conversation> {
    const db = await getDB();
    const newConversation: Conversation = {
      ...conversation,
      id: uuidv4(),
    };
    await db.add('conversations', newConversation);
    return newConversation;
  }

  async getConversation(id: string): Promise<Conversation | null> {
    const db = await getDB();
    return db.get('conversations', id);
  }

  async listConversations(): Promise<Conversation[]> {
    const db = await getDB();
    return db.getAllFromIndex('conversations', 'by-updated');
  }

  async updateConversation(id: string, data: Partial<Conversation>): Promise<Conversation> {
    const db = await getDB();
    const conversation = await this.getConversation(id);
    if (!conversation) {
      throw new Error(`Conversation not found: ${id}`);
    }
    const updatedConversation = {
      ...conversation,
      ...data,
      updatedAt: new Date(),
    };
    await db.put('conversations', updatedConversation);
    return updatedConversation;
  }

  async deleteConversation(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('conversations', id);
    
    // Delete all messages in the conversation
    const messages = await this.getMessages(id);
    await Promise.all(messages.map(msg => this.deleteMessage(msg.id)));
  }

  async createMessage(message: Omit<Message, 'id'>): Promise<Message> {
    const db = await getDB();
    const newMessage: Message = {
      ...message,
      id: uuidv4(),
    };
    await db.add('messages', newMessage);
    return newMessage;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    const db = await getDB();
    return db.getAllFromIndex('messages', 'by-conversation', conversationId);
  }

  async deleteMessage(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('messages', id);
  }
} 