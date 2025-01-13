import { openDB, type DBSchema, type IDBPObjectStore } from "idb";
import type {
  DatabaseAdapter,
  Message,
  Conversation,
} from "@fullmoon/database";
import { v4 as uuidv4 } from "uuid";

interface FullmoonDB extends DBSchema {
  conversations: {
    key: string;
    value: Conversation;
    indexes: {
      "by-updated": Date;
      "by-created": Date;
    };
  };
  messages: {
    key: string;
    value: Message;
    indexes: {
      "by-conversation": string;
      "by-created": Date;
    };
  };
  settings: {
    key: string;
    value: {
      id: string;
      customEndpoint?: string;
      modelName?: string;
    };
  };
}

const DB_NAME = "fullmoon-db";
const DB_VERSION = 5;

async function getDB() {
  return openDB<FullmoonDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create or update conversations store
      if (!db.objectStoreNames.contains("conversations")) {
        const store = db.createObjectStore("conversations", {
          keyPath: "id",
        });
        store.createIndex("by-updated", "updatedAt");
        store.createIndex("by-created", "createdAt");
      }

      // Create or update messages store
      if (!db.objectStoreNames.contains("messages")) {
        const store = db.createObjectStore("messages", {
          keyPath: "id",
        });
        store.createIndex("by-conversation", "conversationId");
        store.createIndex("by-created", "createdAt");
      }

      // Create settings store if it doesn't exist
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", {
          keyPath: "id",
        });
      }
    },
  });
}

export class IndexedDBAdapter implements DatabaseAdapter {
  async createConversation(
    conversation: Omit<Conversation, "id">
  ): Promise<Conversation> {
    const db = await getDB();
    const newConversation: Conversation = {
      id: uuidv4(),
      ...conversation,
    };
    await db.put("conversations", newConversation);
    return newConversation;
  }

  async getConversation(id: string): Promise<Conversation | null> {
    const db = await getDB();
    const conversation = await db.get("conversations", id);
    return conversation || null;
  }

  async listConversations(): Promise<Conversation[]> {
    const db = await getDB();
    const conversations = await db.getAllFromIndex(
      "conversations",
      "by-created"
    );
    return conversations.reverse();
  }

  async updateConversation(
    id: string,
    data: Partial<Conversation>
  ): Promise<Conversation> {
    const db = await getDB();
    const conversation = await db.get("conversations", id);
    if (!conversation) {
      throw new Error(`Conversation ${id} not found`);
    }
    const updatedConversation = {
      ...conversation,
      ...data,
      updatedAt: new Date(),
    };
    await db.put("conversations", updatedConversation);
    return updatedConversation;
  }

  async deleteConversation(id: string): Promise<void> {
    const db = await getDB();
    await db.delete("conversations", id);

    // Delete all messages in the conversation
    const messages = await this.getMessages(id);
    await Promise.all(messages.map((msg) => this.deleteMessage(msg.id)));
  }

  async createMessage(message: Omit<Message, "id">): Promise<Message> {
    const db = await getDB();
    const newMessage: Message = {
      ...message,
      id: uuidv4(),
    };
    await db.add("messages", newMessage);
    return newMessage;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    const db = await getDB();
    const messages = await db.getAllFromIndex(
      "messages",
      "by-conversation",
      conversationId
    );
    return messages.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  async deleteMessage(id: string): Promise<void> {
    const db = await getDB();
    await db.delete("messages", id);
  }

  async getCustomEndpoint(): Promise<{
    endpoint?: string;
    modelName?: string;
  }> {
    const db = await getDB();
    const settings = await db.get("settings", "customEndpoint");
    return {
      endpoint: settings?.customEndpoint,
      modelName: settings?.modelName,
    };
  }

  async setCustomEndpoint(
    endpoint: string | undefined,
    modelName: string | undefined
  ): Promise<void> {
    const db = await getDB();
    await db.put("settings", {
      id: "customEndpoint",
      customEndpoint: endpoint,
      modelName: modelName,
    });
  }
}
