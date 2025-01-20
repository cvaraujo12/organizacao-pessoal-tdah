# Guia de Banco de Dados

## Roteiro de Estudos

### 1. Fundamentos
- **Semana 1-2**: Conceitos Básicos
  - [ ] Tipos de Bancos de Dados
  - [ ] SGBD
  - [ ] Modelos de Dados
  - [ ] Arquitetura de BD

- **Semana 3-4**: Modelagem
  - [ ] Modelo Entidade-Relacionamento
  - [ ] Diagrama ER
  - [ ] Normalização
  - [ ] Constraints

### 2. SQL
- **Semana 5-6**: Comandos Básicos
  - [ ] DDL (CREATE, ALTER, DROP)
  - [ ] DML (INSERT, UPDATE, DELETE)
  - [ ] DQL (SELECT)
  - [ ] DCL (GRANT, REVOKE)

- **Semana 7-8**: Queries Avançadas
  - [ ] JOINs
  - [ ] Subqueries
  - [ ] Funções Agregadas
  - [ ] Views

### 3. Otimização
- **Semana 9-10**: Performance
  - [ ] Índices
  - [ ] Explain Plan
  - [ ] Query Optimization
  - [ ] Caching

- **Semana 11-12**: Administração
  - [ ] Backup e Recovery
  - [ ] Segurança
  - [ ] Monitoramento
  - [ ] Manutenção

## SQL Prático

### Comandos Básicos
```sql
-- Criar tabela
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados
INSERT INTO usuarios (nome, email) 
VALUES ('João Silva', 'joao@email.com');

-- Consultar dados
SELECT * FROM usuarios 
WHERE nome LIKE 'João%'
ORDER BY created_at DESC;

-- Atualizar dados
UPDATE usuarios 
SET email = 'novo@email.com'
WHERE id = 1;

-- Excluir dados
DELETE FROM usuarios 
WHERE id = 1;
```

### Queries Avançadas
```sql
-- JOIN
SELECT u.nome, p.titulo
FROM usuarios u
INNER JOIN posts p ON u.id = p.usuario_id
WHERE p.created_at >= CURRENT_DATE - INTERVAL '7 days';

-- Subquery
SELECT nome
FROM usuarios
WHERE id IN (
    SELECT usuario_id
    FROM posts
    GROUP BY usuario_id
    HAVING COUNT(*) > 5
);

-- View
CREATE VIEW posts_recentes AS
SELECT u.nome, p.titulo, p.created_at
FROM usuarios u
INNER JOIN posts p ON u.id = p.usuario_id
WHERE p.created_at >= CURRENT_DATE - INTERVAL '30 days';
```

## Modelagem

### Exemplo de Diagrama ER
```
[Usuário]1 ----* [Post]
    |
    |
    *
[Comentário]*---- 1[Post]
```

### Normalização
1. **Primeira Forma Normal (1NF)**
   - Valores atômicos
   - Sem repetições
   - Chave primária

2. **Segunda Forma Normal (2NF)**
   - Estar em 1NF
   - Dependências funcionais

3. **Terceira Forma Normal (3NF)**
   - Estar em 2NF
   - Sem dependências transitivas

## Exercícios Práticos

### Nível 1: Básico
1. **Modelagem**
   - Criar modelo ER
   - Mapear para relacional
   - Aplicar normalização
   - Definir constraints

2. **SQL**
   - CRUD básico
   - Filtros simples
   - Ordenação
   - Agrupamento

### Nível 2: Intermediário
1. **Queries Complexas**
   - JOINs múltiplos
   - Subqueries correlacionadas
   - Window Functions
   - CTEs

2. **Otimização**
   - Criar índices
   - Analisar explain plan
   - Otimizar queries
   - Implementar cache

## Projetos Práticos

### Projeto 1: Sistema de Blog
- Usuários e posts
- Comentários
- Tags e categorias
- Sistema de likes

### Projeto 2: E-commerce
- Produtos e categorias
- Carrinho de compras
- Pedidos
- Pagamentos

## Dicas para TDAH

### Modelagem
1. **Visual**
   - Use cores diferentes para entidades
   - Desenhe relacionamentos claramente
   - Faça diagramas simples
   - Use ferramentas visuais

2. **Prática**
   - Comece com modelos pequenos
   - Incremente gradualmente
   - Revise frequentemente
   - Use exemplos reais

### SQL
1. **Queries**
   - Quebre em partes menores
   - Comente cada seção
   - Formate adequadamente
   - Teste incrementalmente

2. **Debugging**
   - Use explain
   - Verifique resultados parciais
   - Mantenha queries de exemplo
   - Document problemas/soluções

## Recursos de Aprendizagem

### Ferramentas
1. **Modelagem**
   - [draw.io](https://draw.io)
   - MySQL Workbench
   - pgModeler
   - ERDPlus

2. **Prática SQL**
   - PostgreSQL
   - DBeaver
   - SQLFiddle
   - DB-Fiddle

### Material Complementar
1. **Documentação**
   - [PostgreSQL Docs](https://www.postgresql.org/docs/)
   - [MySQL Docs](https://dev.mysql.com/doc/)
   - [W3Schools SQL](https://www.w3schools.com/sql/)

2. **Cursos**
   - Stanford Database Course
   - FreeCodeCamp SQL
   - Coursera Database Design

## Avaliação de Progresso

### Checklist de Conceitos
- [ ] Modelagem ER
- [ ] Normalização
- [ ] SQL Básico
- [ ] SQL Avançado
- [ ] Otimização

### Projetos Desenvolvidos
1. **Projeto**: [Nome]
   - Modelo ER:
   - Queries principais:
   - Otimizações realizadas:
   - Link do repositório:

## Preparação para Avaliações

### Teoria
- [ ] Revisar conceitos
- [ ] Fazer mapas mentais
- [ ] Estudar casos de uso
- [ ] Praticar modelagem

### Prática
- [ ] Escrever queries
- [ ] Otimizar performance
- [ ] Resolver exercícios
- [ ] Implementar projetos

## Recursos Adicionais

### Comunidade
- Stack Overflow
- Reddit r/SQL
- Database Administrators SE
- PostgreSQL Forums

### Ferramentas Úteis
1. **Performance**
   - pgAdmin
   - MySQL Workbench
   - SchemaSpy
   - pg_stat_statements

2. **Desenvolvimento**
   - DataGrip
   - Azure Data Studio
   - TablePlus
   - Postico 