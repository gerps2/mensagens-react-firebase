import React, { useEffect, useState } from 'react';
import { MessageService } from '../../application/messages/useMessages';
import { MessageRepository } from '../../infrastructure/repositories/message.firebase-repository';
import { Message } from '../../domain/models/message.model';
import { useAuth } from '../hooks/useAuth';
import { User } from '../../domain/models/user.model';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  Divider 
} from '@mui/material';
import { format } from 'date-fns';  // Biblioteca para formatar datas

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senders, setSenders] = useState<string[]>([]);  // Armazena os remetentes
  const messageService = new MessageService(new MessageRepository());
  const authService = useAuth();

  useEffect(() => {
    // Função para atualizar mensagens em tempo real
    const unsubscribe = messageService.getMessages((msgs) => {
      setMessages(msgs);

      // Coletar remetentes únicos das mensagens
      const uniqueSenders = Array.from(new Set(msgs.map(msg => msg.senderEmail)));
      setSenders(uniqueSenders);
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  const handleSendMessage = () => {
    if (newMessage && recipientEmail) {
      const user = authService?.user as User;

      messageService.sendMessage(
        newMessage,
        user.uid,
        user.email,
        recipientEmail
      );
      setNewMessage('');
      setRecipientEmail('');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Exibe o nome do usuário logado */}
      {authService?.user && (
        <Typography variant="h5" sx={{ mb: 3 }}>
          Olá, {authService.user.displayName}! Você está logado.
        </Typography>
      )}

      <Card sx={{ mb: 4, p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Enviar uma Mensagem
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email do destinatário"
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Digite o email do destinatário"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Digite sua mensagem"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escreva sua mensagem"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            disabled={!newMessage || !recipientEmail}
          >
            Enviar
          </Button>
        </Box>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Mensagens Recebidas
          </Typography>
          <List>
            {messages
              .filter(msg => msg.recipientEmail === authService?.user?.email)
              .map((msg) => (
                <React.Fragment key={msg.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${msg.senderEmail} - ${format(new Date(msg.createdAt), 'dd/MM/yyyy HH:mm')}`}
                      secondary={msg.text}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Remetentes
          </Typography>
          <List>
            {senders.map((sender) => (
              <ListItem key={sender}>
                <ListItemText primary={sender} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Messages;