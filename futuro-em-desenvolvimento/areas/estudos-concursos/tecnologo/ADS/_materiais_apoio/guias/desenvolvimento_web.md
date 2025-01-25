# Guia de Desenvolvimento Web

## Roteiro de Estudos

### 1. Frontend Básico
- **Semana 1-2**: HTML5
  - [ ] Estrutura básica
  - [ ] Tags semânticas
  - [ ] Formulários
  - [ ] Multimídia

- **Semana 3-4**: CSS3
  - [ ] Seletores
  - [ ] Box Model
  - [ ] Flexbox
  - [ ] Grid
  - [ ] Responsividade

### 2. JavaScript
- **Semana 5-6**: Fundamentos
  - [ ] Variáveis e Tipos
  - [ ] Funções
  - [ ] DOM
  - [ ] Eventos

- **Semana 7-8**: ES6+
  - [ ] Arrow Functions
  - [ ] Destructuring
  - [ ] Modules
  - [ ] Async/Await

### 3. Frontend Frameworks
- **Semana 9-10**: React
  - [ ] Componentes
  - [ ] Props e State
  - [ ] Hooks
  - [ ] Context API

- **Semana 11-12**: Ferramentas
  - [ ] Webpack
  - [ ] Babel
  - [ ] ESLint
  - [ ] Jest

## Exemplos Práticos

### HTML Semântico
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo Semântico</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#sobre">Sobre</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="home">
            <h1>Título Principal</h1>
            <article>
                <h2>Artigo</h2>
                <p>Conteúdo do artigo...</p>
            </article>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Exemplo</p>
    </footer>
</body>
</html>
```

### CSS Moderno
```css
/* Variáveis CSS */
:root {
    --cor-primaria: #007bff;
    --cor-secundaria: #6c757d;
    --espacamento-padrao: 1rem;
}

/* Layout Flexbox */
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--espacamento-padrao);
}

/* Grid Layout */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--espacamento-padrao);
}

/* Media Queries */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}
```

### JavaScript Moderno
```javascript
// Classes e Módulos
export class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }

    async salvar() {
        try {
            const response = await fetch('/api/usuarios', {
                method: 'POST',
                body: JSON.stringify(this)
            });
            return await response.json();
        } catch (erro) {
            console.error('Erro:', erro);
        }
    }
}

// React Component
import React, { useState, useEffect } from 'react';

function App() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const carregarDados = async () => {
            const response = await fetch('/api/dados');
            const data = await response.json();
            setDados(data);
        };
        carregarDados();
    }, []);

    return (
        <div>
            {dados.map(item => (
                <div key={item.id}>{item.nome}</div>
            ))}
        </div>
    );
}
```

## Projetos Práticos

### Projeto 1: Portfolio
- Layout responsivo
- Animações CSS
- Formulário de contato
- Galeria de projetos

### Projeto 2: Dashboard
- Autenticação
- CRUD de dados
- Gráficos interativos
- Tema claro/escuro

## Dicas para TDAH

### Durante o Desenvolvimento
1. **Organização**
   - Use extensões de formatação
   - Mantenha arquivos organizados
   - Comente seções importantes
   - Faça commits frequentes

2. **Foco**
   - Use live preview
   - Teste incrementalmente
   - Mantenha console aberto
   - Use snippets

### Debugging
1. **Frontend**
   - DevTools do navegador
   - React DevTools
   - Console.log estratégico
   - Breakpoints visuais

2. **Ferramentas**
   - Prettier
   - ESLint
   - Live Server
   - Auto Save

## Recursos de Aprendizagem

### Documentação
1. **Oficial**
   - [MDN Web Docs](https://developer.mozilla.org/)
   - [React Docs](https://react.dev/)
   - [W3Schools](https://www.w3schools.com/)

2. **Tutoriais**
   - FreeCodeCamp
   - Codecademy
   - Frontend Masters

### Ferramentas Online
1. **Editores**
   - CodePen
   - CodeSandbox
   - StackBlitz

2. **Design**
   - Figma
   - Adobe Color
   - Coolors

## Checklist de Habilidades

### Frontend
- [ ] HTML Semântico
- [ ] CSS Responsivo
- [ ] JavaScript ES6+
- [ ] React Básico
- [ ] Performance Web

### Ferramentas
- [ ] Git/GitHub
- [ ] DevTools
- [ ] Package Managers
- [ ] Build Tools
- [ ] Testing

## Preparação para Projetos

### Setup Inicial
1. **Ambiente**
   ```bash
   # Criar projeto React
   npx create-react-app meu-projeto
   cd meu-projeto
   
   # Instalar dependências comuns
   npm install styled-components
   npm install react-router-dom
   npm install axios
   ```

2. **Estrutura de Arquivos**
   ```
   src/
   ├── components/
   ├── pages/
   ├── styles/
   ├── services/
   └── utils/
   ```

### Checklist de Projeto
- [ ] Wireframes
- [ ] Componentes base
- [ ] Rotas definidas
- [ ] API planejada
- [ ] Testes básicos

## Avaliação de Progresso

### Teoria
- [ ] Revisar conceitos
- [ ] Fazer documentação
- [ ] Estudar padrões
- [ ] Acompanhar atualizações

### Prática
- [ ] Desenvolver projetos
- [ ] Resolver desafios
- [ ] Contribuir open source
- [ ] Criar portfolio

## Recursos Adicionais

### Comunidade
- Discord Frontend BR
- Dev.to
- Frontend Weekly
- CSS-Tricks

### Ferramentas Úteis
1. **Desenvolvimento**
   - VS Code
   - Chrome DevTools
   - Postman
   - Git

2. **Design**
   - Figma
   - Adobe XD
   - Sketch
   - InVision 