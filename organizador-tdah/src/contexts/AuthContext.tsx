import React, { createContext, useContext, useState, useEffect } from 'react';
import { showToast } from '../components/common/Toast/Toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const storedUser = localStorage.getItem('@OrganizadorTDAH:user');
      const storedToken = localStorage.getItem('@OrganizadorTDAH:token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        // Aqui você pode validar o token com o backend
      }
    } catch (error) {
      showToast.error('Erro ao carregar dados do usuário');
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Aqui você implementará a chamada à API de autenticação
      // const response = await api.post('/auth/login', { email, password });
      // const { user, token } = response.data;

      // Mock para desenvolvimento
      const mockUser = {
        id: '1',
        name: 'Usuário Teste',
        email: email,
      };

      localStorage.setItem('@OrganizadorTDAH:user', JSON.stringify(mockUser));
      localStorage.setItem('@OrganizadorTDAH:token', 'mock-token');

      setUser(mockUser);
      showToast.success('Login realizado com sucesso!');
    } catch (error) {
      showToast.error('Erro ao fazer login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('@OrganizadorTDAH:user');
    localStorage.removeItem('@OrganizadorTDAH:token');
    setUser(null);
    showToast.info('Logout realizado com sucesso');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('@OrganizadorTDAH:user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext; 