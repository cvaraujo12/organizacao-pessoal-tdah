# Ferramentas Essenciais para ADS

## Ambiente de Desenvolvimento

### VS Code
- **Extensões Recomendadas**
  - Live Server
  - Prettier
  - ESLint
  - GitLens
  - Thunder Client
  - Code Runner
  - Live Share
  - Material Icon Theme
  - One Dark Pro

- **Configurações para TDAH**
  ```json
  {
    "editor.minimap.enabled": false,
    "editor.fontSize": 14,
    "editor.lineHeight": 24,
    "editor.renderWhitespace": "none",
    "workbench.colorTheme": "One Dark Pro",
    "editor.formatOnSave": true,
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs": true,
    "editor.suggestSelection": "first",
    "editor.wordWrap": "on"
  }
  ```

### Git
- **Comandos Essenciais**
  ```bash
  git init
  git clone <url>
  git add .
  git commit -m "mensagem"
  git push
  git pull
  git checkout -b feature
  git merge feature
  ```

- **Aliases Úteis**
  ```bash
  git config --global alias.st status
  git config --global alias.co checkout
  git config --global alias.br branch
  git config --global alias.ci commit
  ```

## Bancos de Dados

### PostgreSQL
- **GUI**: DBeaver ou pgAdmin
- **Docker**:
  ```bash
  docker run --name postgres -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres
  ```

### MongoDB
- **GUI**: MongoDB Compass
- **Docker**:
  ```bash
  docker run --name mongodb -p 27017:27017 -d mongo
  ```

## Ferramentas de API

### Postman/Thunder Client
- Collections organizadas por projeto
- Variáveis de ambiente
- Testes automatizados
- Documentação automática

### Swagger
- Documentação de API
- Testes de endpoints
- Geração de código cliente

## DevOps

### Docker
- **Comandos Básicos**
  ```bash
  docker ps
  docker images
  docker build -t app .
  docker run app
  docker-compose up
  docker-compose down
  ```

### GitHub Actions
- CI/CD básico
- Testes automatizados
- Deploy automático

## Frontend

### React Developer Tools
- Inspeção de componentes
- Análise de performance
- Debug de estado

### Chrome DevTools
- Console para debug
- Network para requisições
- Elements para DOM
- Application para storage

## Backend

### Node.js
- **NVM (Node Version Manager)**
  ```bash
  nvm install node
  nvm use node
  nvm alias default node
  ```

### Java
- **SDKMAN**
  ```bash
  sdk install java
  sdk use java
  sdk default java
  ```

## Produtividade

### Terminal
- **Oh My Zsh**
- **Aliases**
  ```bash
  alias gs='git status'
  alias gc='git commit'
  alias gp='git push'
  alias gl='git pull'
  ```

### Task Runners
- **NPM Scripts**
  ```json
  {
    "scripts": {
      "start": "node index.js",
      "dev": "nodemon index.js",
      "test": "jest",
      "build": "tsc"
    }
  }
  ```

## IDEs Alternativas

### IntelliJ IDEA
- Melhor suporte para Java
- Debugging avançado
- Refactoring poderoso

### WebStorm
- Específico para JavaScript
- Integração com frameworks
- Debugging avançado

## Ferramentas de Teste

### Jest
- Testes unitários
- Cobertura de código
- Mocking

### Cypress
- Testes E2E
- Interface visual
- Gravação de testes

## Monitoramento

### Sentry
- Rastreamento de erros
- Performance monitoring
- Release tracking

### New Relic
- APM
- Infrastructure monitoring
- Log management

## Segurança

### OWASP ZAP
- Teste de segurança
- Scan de vulnerabilidades
- Relatórios detalhados

### SonarQube
- Análise de código
- Code smells
- Vulnerabilidades
- Cobertura de testes 