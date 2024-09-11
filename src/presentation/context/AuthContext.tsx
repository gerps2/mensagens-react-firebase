import React, { createContext, useState, useEffect, useContext, FC } from 'react';
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { User } from '../../domain/models/user.model';

// Interface para o contexto de autenticação
interface AuthContextProps {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  loading: boolean;  // Adiciona um estado de loading
}

// Interface para as props do AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
}

// Criando o contexto de autenticação
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);  // Estado de carregamento
  
  const auth = getAuth(); // Obtendo a instância de autenticação do Firebase
  const provider = new GoogleAuthProvider(); // Provedor do Google para autenticação

  // Função de login com Google
  const login = () => {
    return signInWithPopup(auth, provider).then(result => {
      if (result.user) {
        setUser({
          uid: result.user.uid,
          displayName: result.user.displayName || '',
          email: result.user.email || ''
        });
      }
    });
  };

  // Função de logout
  const logout = () => {
    signOut(auth).then(() => setUser(null)).catch(error => {
      console.error("Erro ao deslogar:", error);
    });
  };

  // Efeito para monitorar o estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || '',
          email: firebaseUser.email || ''
        });
      } else {
        setUser(null);
      }
      setLoading(false);  // Desativa o estado de carregamento após verificar o status
    });

    // Cleanup do listener de autenticação
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};