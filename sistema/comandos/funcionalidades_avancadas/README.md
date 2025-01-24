# Funcionalidades Avançadas

Este diretório contém as funcionalidades avançadas do sistema de organização pessoal, especialmente adaptadas para TDAH.

## Estrutura

- `zenkit_integration.js`: Integração com Zenkit para sincronização de tarefas
- `energy_management.js`: Sistema de gerenciamento de energia mental
- `config.json`: Configurações gerais do sistema
- `advanced_commands.md`: Lista de comandos avançados

## Funcionalidades Principais

### 1. Integração com Zenkit
- Sincronização bidirecional de tarefas
- Importação e exportação de dados
- Mapeamento automático de status e prioridades

### 2. Gerenciamento de Energia Mental
- Monitoramento de níveis de energia
- Sugestões de pausas adaptativas
- Otimização de rotina baseada em padrões

### 3. Automação
- Agendamento inteligente de tarefas
- Backup automático de dados
- Notificações contextuais

### 4. Integrações
- Google Calendar
- Notion
- Outros serviços configuráveis

## Configuração

1. Copie o arquivo `config.json.example` para `config.json`
2. Preencha as configurações necessárias:
   - API keys
   - IDs de workspace
   - Preferências pessoais

## Uso

### Comandos Básicos
Consulte `commands.md` na pasta principal

### Comandos Avançados
Consulte `advanced_commands.md` nesta pasta

## Personalização

O sistema pode ser personalizado através do arquivo `config.json`. As principais áreas de configuração são:

- Intervalos de sincronização
- Thresholds de energia
- Períodos de foco
- Durações de pausas
- Configurações de notificação

## Desenvolvimento

Para adicionar novas funcionalidades:

1. Crie um novo módulo em `modules/`
2. Atualize o arquivo de configuração
3. Documente no README apropriado
4. Adicione testes quando aplicável

## Suporte

Para questões e suporte:
1. Consulte a documentação
2. Use o comando `/ajuda [comando]`
3. Verifique os logs em `logs/`

## Notas de Uso

- As funcionalidades avançadas são projetadas para se adaptarem ao seu uso
- O sistema aprende com seus padrões
- Recomenda-se um período de adaptação de 2 semanas
- Mantenha as configurações atualizadas

## Recursos Adicionais

- Templates personalizados em `templates/`
- Scripts de automação em `scripts/`
- Arquivos de log em `logs/`

## Segurança

- Dados sensíveis são armazenados localmente
- Backups são criptografados
- Integrações usam autenticação segura

## Manutenção

- Backups diários automáticos
- Logs rotacionados semanalmente
- Atualizações de configuração quando necessário

## Resolução de Problemas

1. Verifique os logs
2. Confirme as configurações
3. Teste as integrações
4. Use o modo debug quando necessário 