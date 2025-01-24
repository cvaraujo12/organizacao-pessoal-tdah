import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loading } from '../../../src/components/common/Loading/Loading';

export const metadata: Metadata = {
  title: 'Dashboard - Organizador TDAH',
  description: 'Área principal do Organizador TDAH',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<Loading />}>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </Suspense>
    </div>
  );
} 