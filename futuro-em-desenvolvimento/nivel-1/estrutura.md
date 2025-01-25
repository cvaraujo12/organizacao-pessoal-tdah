# Estrutura de Diretórios - Nível 1 🏗️

## Diretórios Base
```
/nivel-1
  /src                    # Código fonte
    /commands            # Implementação dos comandos
    /core               # Funcionalidades principais
    /utils              # Utilitários
    /templates          # Templates do sistema
  
  /config               # Arquivos de configuração
    /defaults          # Configurações padrão
    /user             # Configurações do usuário
  
  /docs                 # Documentação
    /commands          # Documentação dos comandos
    /api              # Documentação da API
    /user            # Manual do usuário
  
  /tests               # Testes
    /unit            # Testes unitários
    /integration    # Testes de integração
    /e2e           # Testes end-to-end
  
  /logs                # Logs do sistema
    /system          # Logs do sistema
    /user           # Logs do usuário
    /debug          # Logs de debug
```

## Padrões de Nomenclatura 📝

### Arquivos
- Código fonte: `camelCase.js`
- Configuração: `kebab-case.config.js`
- Documentação: `kebab-case.md`
- Testes: `camelCase.test.js`
- Logs: `YYYY-MM-DD-type.log`

### Diretórios
- Todos em `kebab-case`
- Sem espaços ou caracteres especiais
- Nomes descritivos e concisos

### Branches (Git)
- Feature: `feature/descricao-curta`
- Fix: `fix/descricao-curta`
- Docs: `docs/descricao-curta`

## Hierarquia de Arquivos 📊

1. Nível Raiz
   - README.md
   - package.json
   - .gitignore
   - .env.example

2. Nível Src
   - index.js
   - app.js
   - config.js

3. Nível Commands
   - commandHandler.js
   - commandValidator.js
   - commandExecutor.js

4. Nível Core
   - database.js
   - logger.js
   - validator.js

## Observações 📌

1. Manter estrutura limpa e organizada
2. Seguir padrões estabelecidos
3. Documentar alterações
4. Respeitar hierarquia 