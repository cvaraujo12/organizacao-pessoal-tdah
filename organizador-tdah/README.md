# Organizador TDAH

Sistema de organização pessoal desenvolvido especialmente para pessoas com TDAH, focando em simplicidade, clareza e eficiência.

## Características

- Sistema de autenticação seguro
- Gerenciamento de tarefas adaptado para TDAH
- Acompanhamento de metas e conquistas
- Registro de rotinas diárias
- Monitoramento de saúde e bem-estar
- Controle financeiro
- Planejamento de exercícios
- Registro de alimentação
- Sistema de estudos para concursos

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- NextAuth.js
- TailwindCSS
- Framer Motion
- Sentry

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/organizador-tdah.git
cd organizador-tdah
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações

4. Configure o banco de dados:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

```
organizador-tdah/
├── app/                    # Páginas e rotas (Next.js App Router)
├── prisma/                 # Configuração e schemas do Prisma
├── public/                 # Arquivos estáticos
└── src/
    ├── components/         # Componentes React
    ├── contexts/          # Contextos React
    ├── hooks/             # Hooks personalizados
    ├── lib/               # Bibliotecas e utilidades
    ├── models/            # Modelos de dados
    ├── services/          # Serviços e APIs
    └── utils/             # Funções utilitárias
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm test` - Executa os testes
- `npm run prisma:generate` - Gera os tipos do Prisma
- `npm run prisma:migrate` - Aplica as migrações do banco de dados
- `npm run prisma:studio` - Abre o Prisma Studio

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
