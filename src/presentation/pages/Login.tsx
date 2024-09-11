import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { red } from '@mui/material/colors';  // Importa o tema de cores
import GoogleIcon from '@mui/icons-material/Google';  // Ícone do Google

const Login = () => {
  const authService = useAuth();
  const navigate = useNavigate();  // Cria o hook de navegação

  const handleLogin = () => {
    authService?.login().then(() => {
      navigate('/');  // Redireciona para a página "home" após o login
    }).catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: red[500] }}>
        Bem-vindo ao Fiap Chat
      </Typography>
      <Button
        onClick={handleLogin}
        variant="contained"
        sx={{
          backgroundColor: red[500],
          color: '#fff',
          '&:hover': {
            backgroundColor: red[700],  // Muda a cor no hover
          },
        }}
        startIcon={<GoogleIcon />}  // Ícone do Google à esquerda do texto
      >
        Entrar com Google
      </Button>
    </Box>
  );
};

export default Login;