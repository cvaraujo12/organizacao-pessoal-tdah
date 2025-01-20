#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Função para imprimir mensagens
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar dependências
check_dependencies() {
    print_message "Verificando dependências..."
    
    commands=("git" "node" "npm" "docker" "docker-compose")
    
    for cmd in "${commands[@]}"; do
        if ! command -v $cmd &> /dev/null; then
            print_error "$cmd não está instalado"
            exit 1
        fi
    done
    
    print_message "Todas as dependências estão instaladas"
}

# Criar estrutura de diretórios
create_directory_structure() {
    print_message "Criando estrutura de diretórios..."
    
    directories=(
        "src/assets"
        "src/components"
        "src/pages"
        "src/services"
        "src/utils"
        "src/config"
        "tests"
        "docs"
        "scripts"
    )
    
    for dir in "${directories[@]}"; do
        mkdir -p $dir
        print_message "Criado diretório: $dir"
    done
}

# Inicializar git
init_git() {
    print_message "Inicializando git..."
    
    git init
    
    # Criar .gitignore
    cat > .gitignore << EOL
node_modules/
.env
.env.local
.DS_Store
coverage/
dist/
build/
*.log
EOL
    
    print_message "Criado .gitignore"
}

# Inicializar npm
init_npm() {
    print_message "Inicializando npm..."
    
    # Criar package.json básico
    npm init -y
    
    # Instalar dependências comuns
    npm install --save express dotenv cors helmet
    npm install --save-dev nodemon jest supertest
    
    # Atualizar scripts no package.json
    npm pkg set scripts.start="node src/index.js"
    npm pkg set scripts.dev="nodemon src/index.js"
    npm pkg set scripts.test="jest"
    npm pkg set scripts.lint="eslint src/**/*.js"
    
    print_message "Dependências instaladas e scripts configurados"
}

# Configurar ESLint
setup_eslint() {
    print_message "Configurando ESLint..."
    
    npm install --save-dev eslint
    
    # Criar configuração do ESLint
    cat > .eslintrc.json << EOL
{
    "env": {
        "node": true,
        "es2021": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"]
    }
}
EOL
    
    print_message "ESLint configurado"
}

# Configurar ambiente Docker
setup_docker() {
    print_message "Configurando Docker..."
    
    # Criar Dockerfile
    cat > Dockerfile << EOL
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
EOL
    
    # Criar docker-compose.yml
    cat > docker-compose.yml << EOL
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
  
  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=app
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOL
    
    print_message "Docker configurado"
}

# Criar arquivo de exemplo .env
create_env_example() {
    print_message "Criando arquivo .env.example..."
    
    cat > .env.example << EOL
# Ambiente
NODE_ENV=development

# Servidor
PORT=3000
HOST=localhost

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASS=password
DB_NAME=app

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Logging
LOG_LEVEL=debug
EOL
    
    print_message "Arquivo .env.example criado"
}

# Criar README.md básico
create_readme() {
    print_message "Criando README.md..."
    
    cat > README.md << EOL
# Nome do Projeto

## Descrição
Breve descrição do projeto.

## Requisitos
- Node.js 18+
- Docker
- Docker Compose

## Instalação

1. Clone o repositório
\`\`\`bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
\`\`\`

2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente
\`\`\`bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
\`\`\`

4. Inicie o projeto
\`\`\`bash
# Desenvolvimento
npm run dev

# Produção
npm start
\`\`\`

## Scripts Disponíveis
- \`npm start\`: Inicia o servidor
- \`npm run dev\`: Inicia o servidor em modo desenvolvimento
- \`npm test\`: Executa os testes
- \`npm run lint\`: Executa o linter

## Docker
Para rodar com Docker:
\`\`\`bash
docker-compose up
\`\`\`

## Estrutura do Projeto
\`\`\`
src/
├── assets/      # Arquivos estáticos
├── components/  # Componentes reutilizáveis
├── pages/       # Páginas/rotas
├── services/    # Serviços/integrações
├── utils/       # Utilitários
└── config/      # Configurações
\`\`\`

## Contribuindo
1. Fork o projeto
2. Crie sua branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## Licença
Este projeto está licenciado sob a licença MIT.
EOL
    
    print_message "README.md criado"
}

# Função principal
main() {
    print_message "Iniciando setup do projeto..."
    
    check_dependencies
    create_directory_structure
    init_git
    init_npm
    setup_eslint
    setup_docker
    create_env_example
    create_readme
    
    print_message "Setup concluído com sucesso!"
    print_message "Para começar, execute: npm install && npm run dev"
}

# Executar script
main 