# Sistema de Prioridades

Este sistema foi desenvolvido especialmente para auxiliar na organização e foco, considerando as características do TDAH.

## Como Usar

1. **Visualizar Prioridades**
   - Use `/listar_prioridades` para ver todas as prioridades
   - Use `/listar_prioridades [área]` para filtrar por área

2. **Adicionar Nova Prioridade**
   - Use `/nova_prioridade [área] [descrição]`
   - Exemplo: `/nova_prioridade saude "Agendar consulta médica"`

3. **Atualizar Status**
   - Use `/atualizar_status [id] [novo_status]`
   - Status possíveis: pendente, em_andamento, concluido

4. **Adicionar Subtarefas**
   - Use `/adicionar_subtarefa [id] [descrição]`

## Dicas para TDAH

- Mantenha o foco em no máximo 3 prioridades por vez
- Use as notas_neuro para estratégias específicas
- Revise suas prioridades semanalmente
- Celebre as conquistas, mesmo as pequenas

## Estrutura do Arquivo

O arquivo `priority_bank.json` organiza as prioridades em:
- Áreas (saude, estudos, organizacao, etc.)
- Tarefas com subtarefas
- Notas neuropsicológicas para cada tarefa
