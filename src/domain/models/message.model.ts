export interface Message {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
  senderEmail: string;
  recipientEmail: string;
}
