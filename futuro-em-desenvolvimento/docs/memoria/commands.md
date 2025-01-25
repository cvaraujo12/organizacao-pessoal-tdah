# Comandos do Painel de Controle

## /report-painel
Gera um relatório detalhado do estado atual do desenvolvimento do painel, lendo o arquivo `painel_status.json` da pasta `organizador-tdah/`.

### Uso:
```bash
/report-painel [--update] # O parâmetro --update força uma atualização do status antes de gerar o relatório
```

### Retorno:
- Status atual do desenvolvimento
- Fase e progresso
- Próximas ações possíveis
- Dependências pendentes
- Métricas atuais
- Histórico de alterações recentes

### Exemplo de retorno:
```
📊 Status do Painel de Controle
═══════════════════════════════

📌 Fase Atual: 1 - Configuração do Ambiente Base
📈 Progresso Geral: 15%
🕒 Última Atualização: 22/01/2024

✅ Tarefas Concluídas:
- Setup do Next.js
- Estruturação de pastas

📋 Próximas Ações Autônomas:
- Configurar ESLint adicional
- Configurar Prettier
- Instalar dependências MongoDB

⚠️ Dependências do Usuário:
- Confirmar stack tecnológica
- Fornecer credenciais MongoDB
- Definir variáveis de ambiente

📊 Métricas:
- Cobertura de Testes: 0%
- Lighthouse Score: N/A
- PWA Status: não iniciado
- CI/CD Status: não configurado

📝 Últimas Alterações:
22/01/2024 - Atualização da estrutura de pastas
22/01/2024 - Configuração inicial do Next.js
```

### Observações:
- O arquivo `painel_status.json` é atualizado automaticamente após cada alteração significativa no desenvolvimento
- O relatório sempre mostra as informações mais recentes do arquivo
- Use o parâmetro `--update` para forçar uma verificação de status antes de gerar o relatório 