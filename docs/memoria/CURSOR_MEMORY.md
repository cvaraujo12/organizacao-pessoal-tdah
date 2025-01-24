# Memória do Projeto: Organizador Pessoal TDAH

## Checklist Pré-Sessão
- [x] CURSOR_MEMORY revisado
- [x] Objetivo definido
- [x] Decisões anteriores verificadas

## Decisões Tomadas
1. Interface minimalista com foco em redução de sobrecarga cognitiva
2. Feedback imediato para ações do usuário
3. Instruções claras e diretas
4. Sistema de verificação de sessão para prevenir sobrecarga
5. Divisão clara entre frontend e backend
6. Uso de Next.js com App Router
7. Implementação de temas claro/escuro
8. Componentes reutilizáveis com variants

## Controle Cognitivo
- Complexidade atual: 3/10
- Pontos de decisão: 2
- Pausas recomendadas: 0

## Próximos Passos
1. Resolver problemas de estrutura de diretórios
2. Corrigir paths de importação
3. Implementar sistema de autenticação
4. Desenvolver dashboard inicial

## Princípios Fundamentais do Sistema

### 1. Adaptação para TDAH
- Considerar as características específicas do TDAH tipo desatento
- Criar sistemas que reduzam a sobrecarga cognitiva
- Implementar lembretes e notificações efetivas
- Manter interfaces limpas e minimalistas

### 2. Neurociência Aplicada
- Utilizar conhecimentos de neuropsicologia para estruturar tarefas
- Aplicar princípios de neuropsiquiatria no design de rotinas
- Considerar ciclos de dopamina e noradrenalina
- Adaptar sistemas à neurodiversidade

### 3. Gestão de Saúde
- Monitorar padrões de sono, humor e energia
- Integrar exercícios adaptados às limitações físicas
- Considerar restrições alimentares e preferências
- Manter registros de consultas e medicações

### 4. Organização Pessoal
- Dividir tarefas em partes gerenciáveis
- Criar sistemas de priorização claros
- Manter rotinas flexíveis mas consistentes
- Implementar revisões regulares

## Áreas de Foco

### 1. Gestão de Tarefas e Rotinas
- Usar templates predefinidos para reduzir decisões
- Implementar sistema Pomodoro adaptativo
- Criar fluxos de trabalho claros
- Manter registro de progresso

### 2. Estudos e Aprendizado
- Adaptar materiais para facilitar compreensão
- Criar resumos e mapas mentais efetivos
- Implementar sistema de revisão espaçada
- Monitorar progresso em concursos

### 3. Saúde e Bem-estar
- Registrar métricas de saúde relevantes
- Adaptar exercícios às limitações
- Planejar alimentação considerando restrições
- Monitorar padrões de sono e energia

### 4. Finanças e Organização
- Manter sistemas simples de controle financeiro
- Criar rotinas de organização doméstica
- Implementar lembretes para contas e compromissos
- Registrar gastos e orçamentos

## Sistema de Arquivos

### 1. Estrutura de Pastas
- Manter hierarquia clara e intuitiva
- Usar nomenclatura consistente
- Implementar sistema de backup
- Facilitar busca e recuperação

### 2. Templates e Modelos
- Criar templates para diferentes necessidades
- Manter padrões consistentes
- Adaptar formatos para importação
- Facilitar personalização

## Desenvolvimento do Painel de Controle

## Interações e Comandos

### 1. Comandos Básicos
- Manter lista atualizada de comandos
- Implementar atalhos intuitivos
- Fornecer feedback claro
- Permitir personalização

### 2. Automações
- Criar rotinas automatizadas
- Implementar lembretes inteligentes
- Sincronizar com calendários
- Manter logs de atividades

## Aprendizados Contínuos

### 1. Adaptação ao Usuário
- Observar padrões de uso
- Coletar feedback regularmente
- Ajustar sistemas conforme necessário
- Manter flexibilidade

### 2. Melhorias do Sistema
- Identificar pontos de fricção
- Implementar soluções iterativas
- Manter documentação atualizada
- Avaliar efetividade das mudanças

## Notas Importantes

### 1. Considerações sobre TDAH
- Evitar sobrecarga de informações
- Manter instruções claras e diretas
- Fornecer feedback imediato
- Criar sistemas de recompensa

### 2. Adaptações Pessoais
- Considerar preferências individuais
- Adaptar à rotina existente
- Respeitar limitações
- Celebrar progressos

## Recursos e Referências

### 1. Ferramentas Recomendadas
- Apps e softwares úteis
- Integrações possíveis
- Recursos de acessibilidade
- Ferramentas de produtividade

### 2. Material de Apoio
- Guias e tutoriais
- Documentação técnica
- Recursos educacionais
- Material de referência

## Notas Técnicas

### Dependências Principais
```json
{
  "next": "^13.0.0",
  "react": "^18.0.0",
  "typescript": "^4.8.0",
  "mongoose": "^6.0.0",
  "zod": "^3.0.0",
  "@mui/material": "^5.0.0",
  "react-query": "^3.0.0"
}
```

### Scripts Úteis
```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Testes
npm run test
npm run test:watch
npm run test:coverage

# Lint
npm run lint
npm run lint:fix
```

### Comandos Git Úteis
```bash
# Atualizar branch
git pull origin main

# Criar nova branch
git checkout -b feature/nome-da-feature

# Commit
git add .
git commit -m "feat: descrição da feature"

# Push
git push origin feature/nome-da-feature
```

## Aprendizados de Desenvolvimento

### 1. Configuração Inicial do Projeto
- **Planejamento Estruturado**
  - Necessidade de análise completa antes de começar implementações
  - Importância de definir claramente a estrutura de diretórios
  - Evitar duplicação de diretórios (como dois diretórios src)

- **Gestão de Dependências**
  - Listar todas as dependências necessárias no início do projeto
  - Instalar e configurar tipos TypeScript adequadamente
  - Manter versões compatíveis entre pacotes

- **Estrutura Next.js**
  - Decidir entre pages router e app router antes de começar
  - Configurar corretamente o tsconfig.json para aliases (@/*)
  - Garantir que componentes estejam nos diretórios corretos

- **Erros Comuns e Soluções**
  - Problemas com módulos não encontrados geralmente indicam paths incorretos
  - Erros de tipos TypeScript requerem instalação de @types correspondentes
  - Limpar cache (.next e tsconfig.tsbuildinfo) ao encontrar erros persistentes 

### 2. Resolução Sistemática de Erros de Build

#### Abordagem "Root Cause Analysis"
1. **Análise Inicial**
   - Categorizar o tipo de erro (módulo não encontrado, tipo incorreto, conflito de versões)
   - Identificar todos os arquivos afetados antes de começar as correções
   - Documentar a cadeia de dependências envolvida

2. **Verificação de Ambiente**
   - Confirmar versões das dependências no package.json
   - Verificar compatibilidade entre pacotes
   - Validar configurações do TypeScript e Next.js

3. **Plano de Correção**
   - Criar lista ordenada de correções necessárias
   - Começar pelas dependências fundamentais
   - Testar cada alteração individualmente
   - Manter backup das alterações

4. **Prevenção de Problemas**
   - Manter um template base de configuração
   - Documentar decisões de arquitetura
   - Criar checklist de verificação pré-build
   - Implementar testes de integração

#### Lições Aprendidas
1. **Evitar Correções Isoladas**
   - Não corrigir apenas o erro atual sem entender o contexto
   - Mapear dependências antes de fazer alterações
   - Considerar impacto em outras partes do sistema

2. **Manter Consistência**
   - Padronizar estrutura de imports
   - Usar paths consistentes (relativos vs absolutos)
   - Manter convenções de nomenclatura

3. **Documentação e Logging**
   - Registrar erros encontrados e soluções
   - Manter histórico de alterações
   - Documentar decisões de arquitetura

4. **Automação e Tooling**
   - Criar scripts de verificação
   - Implementar linting rigoroso
   - Usar ferramentas de análise estática

#### Checklist de Verificação Pré-Build
```markdown
1. Dependências
   - [ ] package.json atualizado
   - [ ] dependências instaladas
   - [ ] versões compatíveis
   - [ ] tipos TypeScript instalados

2. Configuração
   - [ ] tsconfig.json correto
   - [ ] next.config.js atualizado
   - [ ] aliases configurados
   - [ ] variáveis de ambiente definidas

3. Estrutura
   - [ ] arquivos nos diretórios corretos
   - [ ] imports consistentes
   - [ ] componentes exportados corretamente
   - [ ] tipos definidos adequadamente

4. Linting e Tipos
   - [ ] sem erros de lint
   - [ ] tipos TypeScript corretos
   - [ ] interfaces exportadas
   - [ ] props documentadas
```

#### Fluxo de Resolução de Problemas
1. **Identificação**
   - Coletar todos os erros
   - Categorizar por tipo
   - Identificar padrões

2. **Análise**
   - Verificar dependências
   - Revisar configurações
   - Validar estrutura

3. **Planejamento**
   - Listar correções necessárias
   - Ordenar por prioridade
   - Definir pontos de verificação

4. **Execução**
   - Aplicar correções
   - Testar incrementalmente
   - Documentar mudanças

5. **Verificação**
   - Testar build completo
   - Validar funcionalidades
   - Confirmar resolução 

### 3. Resolução de Problemas de Build

#### Problemas Encontrados e Soluções
1. **Estrutura de Diretórios Confusa**
   - Identificação de diretórios duplicados
   - Necessidade de consolidação da estrutura
   - Importância de manter uma hierarquia clara

2. **Dependências Faltantes**
   - Instalação completa de todas as dependências necessárias
   - Verificação de compatibilidade entre versões
   - Atualização do package.json

3. **Configuração do TypeScript**
   - Ajuste correto dos paths no tsconfig.json
   - Configuração do baseUrl e paths
   - Suporte ao JSX e incrementalidade

4. **Estrutura Next.js**
   - Migração para App Router
   - Organização correta dos diretórios
   - Resolução de conflitos entre pages e app

#### Checklist de Verificação
1. **Estrutura do Projeto**
   - [ ] Diretórios organizados corretamente
   - [ ] Sem duplicação de arquivos
   - [ ] Hierarquia clara e lógica

2. **Dependências**
   - [ ] Todas as dependências instaladas
   - [ ] Versões compatíveis
   - [ ] package.json atualizado

3. **Configuração**
   - [ ] tsconfig.json correto
   - [ ] next.config.js atualizado
   - [ ] Variáveis de ambiente configuradas

4. **Código**
   - [ ] Imports usando paths corretos
   - [ ] Componentes no lugar certo
   - [ ] Tipos TypeScript definidos 