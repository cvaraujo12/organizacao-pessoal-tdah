# Componente de Visualização de Prioridades

Este componente foi desenvolvido especialmente para pessoas com TDAH, focando em uma interface limpa e intuitiva para gerenciamento de prioridades.

## Características

### Visualização Kanban
- Organização visual clara em colunas
- Drag & drop intuitivo
- Cores distintas por nível de prioridade
- Limite de cards por coluna para evitar sobrecarga

### Visualização em Lista
- Agrupamento por área
- Ordenação por prioridade
- Visualização detalhada de subtarefas
- Notas neuropsicológicas visíveis

### Filtros
- Por área
- Por nível de prioridade
- Por status
- Por data
- Por tags

## Acessibilidade

- Alto contraste disponível
- Fonte ajustável
- Suporte a navegação por teclado
- Dicas contextuais
- Modo reduzido de movimento

## Como Usar

### Instalação
```bash
npm install @tdah-tools/priority-view
```

### Uso Básico
```jsx
import PriorityView from '@tdah-tools/priority-view';

function App() {
  return (
    <PriorityView
      prioridades={prioridades}
      onPrioridadeChange={handlePrioridadeChange}
    />
  );
}
```

### Props
- `prioridades`: Array de prioridades
- `onPrioridadeChange`: Callback para mudanças
- `viewMode`: Modo de visualização ('kanban' ou 'lista')
- `config`: Configurações personalizadas

## Dicas para TDAH

1. **Mantenha o Foco**
   - Use a visualização Kanban para ter uma visão clara do progresso
   - Limite o número de tarefas em andamento
   - Use as cores como guia visual

2. **Evite Sobrecarga**
   - Utilize filtros para reduzir informações visíveis
   - Mantenha apenas o necessário em vista
   - Use o modo lista quando precisar de mais detalhes

3. **Mantenha o Momentum**
   - Mova os cards conforme progride
   - Celebre as conclusões
   - Use as notas neuro como lembretes de estratégias

## Personalização

O componente pode ser personalizado através do arquivo `config.json`:
- Temas visuais
- Limites de cards
- Cores e fontes
- Comportamentos de interação 