# Painel de Controle

Interface visual para gerenciamento do sistema, adaptada para TDAH.

## Objetivo
Fornecer uma interface centralizada e intuitiva para:
- Visualização de tarefas e prioridades
- Monitoramento de progresso
- Gestão de rotinas
- Acompanhamento de métricas
- Acesso rápido a informações importantes

## Estrutura
```
painel/
├── src/               # Código fonte
├── components/        # Componentes React
├── lib/              # Bibliotecas e utilitários
├── types/            # Definições de tipos
├── providers/        # Provedores de contexto
└── public/           # Arquivos estáticos
```

## Tecnologias
- Next.js 13 (App Router)
- TypeScript
- MongoDB/PostgreSQL
- Prisma ORM
- TailwindCSS
- React Query

## Funcionalidades
1. Dashboard Principal
   - Visão geral do dia
   - Tarefas prioritárias
   - Lembretes importantes
   - Status de saúde

2. Gestão de Tarefas
   - Visualização Kanban
   - Sistema de prioridades
   - Decomposição de tarefas
   - Lembretes adaptativos

3. Monitoramento
   - Métricas de produtividade
   - Padrões de sono e energia
   - Progresso de metas
   - Histórico de conquistas

4. Configurações
   - Temas (claro/escuro)
   - Notificações
   - Integrações
   - Backup automático

## Desenvolvimento
1. Instalação
   ```bash
   npm install
   ```

2. Configuração
   - Copie `.env.example` para `.env`
   - Configure as variáveis de ambiente
   - Ajuste `next.config.js` se necessário

3. Execução
   ```bash
   npm run dev
   ```

## Integrações
- Google Calendar
- Notion
- Zenkit
- Apps de saúde

## Acessibilidade
- Suporte a navegação por teclado
- Temas de alto contraste
- Fontes ajustáveis
- Feedback sonoro opcional
