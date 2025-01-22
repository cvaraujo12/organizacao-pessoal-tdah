import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, Button } from '@/components/common';

export default function Home() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Resumo de Tarefas */}
        <Card className="col-span-1" priority="medium">
          <h2 className="text-xl font-semibold mb-4">Tarefas</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Pendentes</span>
              <span className="font-medium text-yellow-600">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Em Progresso</span>
              <span className="font-medium text-blue-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Concluídas</span>
              <span className="font-medium text-green-600">12</span>
            </div>
          </div>
          <Button className="w-full mt-4" variant="outline" withIcon>
            Ver Todas
          </Button>
        </Card>

        {/* Próximas Rotinas */}
        <Card className="col-span-1" priority="low">
          <h2 className="text-xl font-semibold mb-4">Próximas Rotinas</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Rotina Matinal</span>
              <span className="text-sm text-gray-500">08:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Estudos</span>
              <span className="text-sm text-gray-500">14:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Exercícios</span>
              <span className="text-sm text-gray-500">17:00</span>
            </div>
          </div>
          <Button className="w-full mt-4" variant="outline" withIcon>
            Ver Agenda
          </Button>
        </Card>

        {/* Status de Saúde */}
        <Card className="col-span-1" priority="high">
          <h2 className="text-xl font-semibold mb-4">Saúde</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Medicações Hoje</span>
              <span className="font-medium text-red-600">2 pendentes</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Água</span>
              <span className="font-medium text-yellow-600">4/8 copos</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Sono</span>
              <span className="font-medium text-green-600">7h30min</span>
            </div>
          </div>
          <Button className="w-full mt-4" variant="outline" withIcon>
            Atualizar
          </Button>
        </Card>

        {/* Próximas Atividades */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Próximas Atividades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card variant="outline" status="pending" isInteractive>
              <h3 className="font-medium">Revisar Material de Estudos</h3>
              <p className="text-sm text-gray-500 mt-1">14:30 - 15:30</p>
            </Card>
            <Card variant="outline" status="inProgress" isInteractive>
              <h3 className="font-medium">Organizar Área de Trabalho</h3>
              <p className="text-sm text-gray-500 mt-1">15:45 - 16:15</p>
            </Card>
            <Card variant="outline" status="pending" isInteractive>
              <h3 className="font-medium">Preparar Lista de Compras</h3>
              <p className="text-sm text-gray-500 mt-1">16:30 - 17:00</p>
            </Card>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 