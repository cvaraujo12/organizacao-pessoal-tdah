import Image from "next/image";
import { AccessibilityControls } from '@/components/AccessibilityControls'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary-600 mb-8 animate-fade-in">
          Organizador TDAH
        </h1>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="task-card">
            <h2 className="text-xl font-semibold mb-4">Tarefas Pendentes</h2>
            {/* Componente de tarefas será adicionado aqui */}
          </div>

          <div className="task-card">
            <h2 className="text-xl font-semibold mb-4">Rotina Diária</h2>
            {/* Componente de rotina será adicionado aqui */}
          </div>

          <div className="task-card">
            <h2 className="text-xl font-semibold mb-4">Metas</h2>
            {/* Componente de metas será adicionado aqui */}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Acessibilidade</h2>
          <AccessibilityControls />
        </section>
      </main>
    </div>
  );
}
