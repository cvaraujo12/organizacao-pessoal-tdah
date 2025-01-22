import React from 'react';
import { Loading } from '../common';

interface MainLayoutProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, loading }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Organizador TDAH
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loading size="lg" label="Carregando..." />
          </div>
        ) : (
          children
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © 2024 Organizador TDAH. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}; 