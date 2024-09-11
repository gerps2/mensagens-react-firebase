import { Message } from "../models/message.model";

export interface IMessagesRepository {
  getMessages(onUpdate: (messages: Message[]) => void): () => void;
  
  sendMessage(
    text: string, 
    userId: string, 
    senderEmail: string, 
    recipientEmail: string
  ): Promise<void>;
}
