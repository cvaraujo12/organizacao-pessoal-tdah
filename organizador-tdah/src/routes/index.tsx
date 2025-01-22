import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Páginas
import PriorityView from '../components/features/Priority/PriorityView';
import Layout from '../components/layout/Layout/Layout';

// Lazy loading para outras páginas
const Home = React.lazy(() => import('../pages/Home'));
const Tasks = React.lazy(() => import('../pages/Tasks'));
const Calendar = React.lazy(() => import('../pages/Calendar'));
const Goals = React.lazy(() => import('../pages/Goals'));
const Health = React.lazy(() => import('../pages/Health'));
const Finance = React.lazy(() => import('../pages/Finance'));
const Exercise = React.lazy(() => import('../pages/Exercise'));
const Food = React.lazy(() => import('../pages/Food'));
const Study = React.lazy(() => import('../pages/Study'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Login = React.lazy(() => import('../pages/Login'));

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/tarefas"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/agenda"
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/metas"
          element={
            <PrivateRoute>
              <Goals />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/saude"
          element={
            <PrivateRoute>
              <Health />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/financas"
          element={
            <PrivateRoute>
              <Finance />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/exercicios"
          element={
            <PrivateRoute>
              <Exercise />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/alimentacao"
          element={
            <PrivateRoute>
              <Food />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/estudos"
          element={
            <PrivateRoute>
              <Study />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/configuracoes"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes; 