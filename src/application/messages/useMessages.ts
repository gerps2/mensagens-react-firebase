import { Message } from "../../domain/models/message.model";
import { IMessagesRepository } from "../../domain/repositories/message.repository";

export class MessageService {
  constructor(private messagesRepo: IMessagesRepository) {}

  // Método para ouvir mensagens em tempo real
  getMessages(onUpdate: (messages: Message[]) => void): () => void {
    return this.messagesRepo.getMessages(onUpdate);
  }

  sendMessage(
    text: string,
    userId: string,
    senderEmail: string,
    recipientEmail: string
  ): Promise<void> {
    return this.messagesRepo.sendMessage(text, userId, senderEmail, recipientEmail);
  }
}
