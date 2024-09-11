import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

interface PrivateRouteProps {
  component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        {/* Spinner de carregamento */}
        <CircularProgress sx={{ color: red[500] }} />

        {/* Texto de carregamento */}
        <Typography variant="h6" sx={{ color: red[500], mt: 2 }}>
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default PrivateRoute;
