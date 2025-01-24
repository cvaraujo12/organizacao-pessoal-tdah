import React, { createContext, useContext, useState, useEffect } from 'react';
import { showToast } from '../components/common/Toast/Toast';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    focusMode: boolean;
    taskView: 'list' | 'kanban' | 'calendar';
  };
  healthProfile: {
    tdahType?: 'desatento' | 'hiperativo' | 'combinado';
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      schedule: string[];
    }>;
    dietaryRestrictions: string[];
    exercisePreferences: string[];
  };
  studyPreferences: {
    preferredStudyTime: string[];
    breakDuration: number;
    studyDuration: number;
    preferredMaterials: string[];
  };
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
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
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
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
      const response = await axios.post('/api/auth/login', { email, password });
      const { user, token } = response.data;

      localStorage.setItem('@OrganizadorTDAH:user', JSON.stringify(user));
      localStorage.setItem('@OrganizadorTDAH:token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      showToast.success('Login realizado com sucesso!');
    } catch (error) {
      showToast.error('Erro ao fazer login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { user } = response.data;

      showToast.success('Cadastro realizado com sucesso! Faça login para continuar.');
      return user;
    } catch (error) {
      showToast.error('Erro ao realizar cadastro');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('@OrganizadorTDAH:user');
    localStorage.removeItem('@OrganizadorTDAH:token');
    delete axios.defaults.headers.common['Authorization'];
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
        signUp,
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