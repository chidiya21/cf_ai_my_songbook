import { Env, ChatMemory, ChatMessage } from '../types';

export class MemoryService {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async saveMemory(
    sessionId: string,
    messages: ChatMessage[],
    context: Record<string, any>
  ): Promise<void> {
    try {
      const memory: ChatMemory = {
        sessionId,
        messages,
        context,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      // Store in KV with 24-hour expiration
      await this.env.CHAT_MEMORY.put(
        `session:${sessionId}`,
        JSON.stringify(memory),
        {
          expirationTtl: 86400 // 24 hours
        }
      );
    } catch (error) {
      console.error('Error saving memory:', error);
      throw new Error('Failed to save chat memory');
    }
  }

  async getMemory(sessionId: string): Promise<ChatMemory | null> {
    try {
      const data = await this.env.CHAT_MEMORY.get(`session:${sessionId}`);

      if (!data) {
        return null;
      }

      return JSON.parse(data) as ChatMemory;
    } catch (error) {
      console.error('Error getting memory:', error);
      return null;
    }
  }

  async updateContext(
    sessionId: string,
    contextUpdates: Record<string, any>
  ): Promise<void> {
    try {
      const memory = await this.getMemory(sessionId);

      if (!memory) {
        throw new Error('Session not found');
      }

      memory.context = {
        ...memory.context,
        ...contextUpdates
      };
      memory.updatedAt = Date.now();

      await this.env.CHAT_MEMORY.put(
        `session:${sessionId}`,
        JSON.stringify(memory),
        {
          expirationTtl: 86400
        }
      );
    } catch (error) {
      console.error('Error updating context:', error);
      throw new Error('Failed to update context');
    }
  }

  async addMessage(sessionId: string, message: ChatMessage): Promise<void> {
    try {
      const memory = await this.getMemory(sessionId);

      if (!memory) {
        // Create new memory if it doesn't exist
        await this.saveMemory(sessionId, [message], {});
        return;
      }

      memory.messages.push(message);
      memory.updatedAt = Date.now();

      // Keep only last 50 messages to avoid storage limits
      if (memory.messages.length > 50) {
        memory.messages = memory.messages.slice(-50);
      }

      await this.env.CHAT_MEMORY.put(
        `session:${sessionId}`,
        JSON.stringify(memory),
        {
          expirationTtl: 86400
        }
      );
    } catch (error) {
      console.error('Error adding message:', error);
      throw new Error('Failed to add message');
    }
  }

  async deleteMemory(sessionId: string): Promise<void> {
    try {
      await this.env.CHAT_MEMORY.delete(`session:${sessionId}`);
    } catch (error) {
      console.error('Error deleting memory:', error);
      throw new Error('Failed to delete memory');
    }
  }

  async getRecentSessions(limit: number = 10): Promise<string[]> {
    try {
      const list = await this.env.CHAT_MEMORY.list({
        prefix: 'session:',
        limit
      });

      return list.keys.map(key => key.name.replace('session:', ''));
    } catch (error) {
      console.error('Error getting recent sessions:', error);
      return [];
    }
  }

  async extendSession(sessionId: string): Promise<void> {
    try {
      const memory = await this.getMemory(sessionId);

      if (!memory) {
        throw new Error('Session not found');
      }

      // Re-save with fresh TTL
      await this.env.CHAT_MEMORY.put(
        `session:${sessionId}`,
        JSON.stringify(memory),
        {
          expirationTtl: 86400
        }
      );
    } catch (error) {
      console.error('Error extending session:', error);
      throw new Error('Failed to extend session');
    }
  }
}
