import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const authContext = useAuth();
  const user = authContext?.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    authContext?.logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: red[500] }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fiap Chat
          </Typography>
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Sair da Aplicação
            </Button>
          ) }
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 2 }}>{children}</Container>
    </>
  );
};

export default Layout;
