import { db } from "../firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Message } from "../../domain/models/message.model";
import { IMessagesRepository } from "../../domain/repositories/message.repository";

export class MessageRepository implements IMessagesRepository {
  // Método ajustado para receber um callback que atualiza as mensagens em tempo real
  getMessages(onUpdate: (messages: Message[]) => void): () => void {
    const q = query(collection(db, "messages"));
    
    // onSnapshot retorna um listener que escuta as mudanças em tempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          userId: data.userId,
          senderEmail: data.senderEmail,
          recipientEmail: data.recipientEmail,
        });
      });
      onUpdate(messages);  // Chama o callback passado para atualizar as mensagens
    });

    // Retorna a função unsubscribe para limpar o listener quando necessário
    return unsubscribe;
  }

  // Método para enviar mensagens
  async sendMessage(
    text: string,
    userId: string,
    senderEmail: string,
    recipientEmail: string
  ): Promise<void> {
    await addDoc(collection(db, "messages"), {
      text,
      createdAt: serverTimestamp(),
      userId,
      senderEmail,
      recipientEmail,
    });
  }
}
