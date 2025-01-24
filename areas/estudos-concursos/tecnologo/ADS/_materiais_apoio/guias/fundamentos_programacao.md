# Guia de Fundamentos de Programação

## Roteiro de Estudos

### 1. Lógica de Programação
- **Semana 1-2**: Conceitos Básicos
  - [ ] Algoritmos e Fluxogramas
  - [ ] Variáveis e Tipos de Dados
  - [ ] Operadores
  - [ ] Estruturas Sequenciais

- **Semana 3-4**: Estruturas de Controle
  - [ ] Condicionais (if/else)
  - [ ] Switch/Case
  - [ ] Loops (for, while)
  - [ ] Break/Continue

### 2. Python Básico
- **Semana 5-6**: Introdução
  - [ ] Ambiente de Desenvolvimento
  - [ ] Sintaxe Básica
  - [ ] Tipos de Dados
  - [ ] Operações Básicas

- **Semana 7-8**: Estruturas de Dados
  - [ ] Listas
  - [ ] Tuplas
  - [ ] Dicionários
  - [ ] Sets

### 3. Funções e Modularização
- **Semana 9-10**: Funções
  - [ ] Definição e Chamada
  - [ ] Parâmetros e Retorno
  - [ ] Escopo
  - [ ] Funções Lambda

- **Semana 11-12**: Modularização
  - [ ] Módulos
  - [ ] Pacotes
  - [ ] Imports
  - [ ] Virtual Environments

## Recursos de Aprendizagem

### Ferramentas
1. **IDEs Recomendadas**
   - VSCode com extensões Python
   - PyCharm Community
   - Jupyter Notebooks

2. **Sites de Prática**
   - [Python.org](https://www.python.org/)
   - [Exercism](https://exercism.io/tracks/python)
   - [HackerRank](https://www.hackerrank.com/domains/python)
   - [Codewars](https://www.codewars.com/)

### Material de Apoio
1. **Documentação**
   - [Python Documentation](https://docs.python.org/3/)
   - [Real Python](https://realpython.com/)
   - [Python for Beginners](https://www.python.org/about/gettingstarted/)

2. **Vídeos e Cursos**
   - Curso em Vídeo - Python
   - FreeCodeCamp Python
   - Microsoft Python for Beginners

## Exercícios Práticos

### Nível 1: Básico
1. **Calculadora Simples**
   ```python
   def calculadora():
       num1 = float(input("Primeiro número: "))
       num2 = float(input("Segundo número: "))
       op = input("Operação (+,-,*,/): ")
       
       if op == '+':
           return num1 + num2
       # Implementar outras operações
   ```

2. **Conversor de Temperatura**
   ```python
   def celsius_para_fahrenheit(celsius):
       return (celsius * 9/5) + 32
   ```

### Nível 2: Intermediário
1. **Lista de Tarefas**
   ```python
   tarefas = []
   
   def adicionar_tarefa(tarefa):
       tarefas.append({"tarefa": tarefa, "completa": False})
   
   def marcar_completa(indice):
       tarefas[indice]["completa"] = True
   ```

2. **Jogo da Forca**
   ```python
   def iniciar_jogo():
       palavra = "python"
       tentativas = 6
       letras_certas = set()
       # Implementar lógica do jogo
   ```

## Projetos Práticos

### Projeto 1: Sistema de Notas
- Cadastro de alunos
- Registro de notas
- Cálculo de médias
- Relatórios simples

### Projeto 2: Agenda de Contatos
- CRUD de contatos
- Busca por nome/telefone
- Exportação para CSV
- Interface via terminal

## Dicas para TDAH

### Durante o Estudo
1. **Código**
   - Comente cada seção
   - Use nomes descritivos
   - Quebre em funções pequenas
   - Teste frequentemente

2. **Ambiente**
   - Terminal limpo
   - Tema escuro no editor
   - Fonte legível
   - Autocompletar ativado

### Prática
1. **Exercícios**
   - Comece com problemas pequenos
   - Incremente gradualmente
   - Use casos de teste
   - Documente soluções

2. **Projetos**
   - Divida em partes menores
   - Estabeleça metas diárias
   - Commit a cada feature
   - Celebre progressos

## Avaliação de Progresso

### Checklist de Habilidades
- [ ] Entendo algoritmos básicos
- [ ] Sei usar estruturas de controle
- [ ] Trabalho com funções
- [ ] Manipulo diferentes tipos de dados
- [ ] Crio programas modulares
- [ ] Uso boas práticas de código

### Projetos Concluídos
1. **Projeto**: [Nome]
   - Data: YYYY-MM-DD
   - Principais aprendizados:
   - Dificuldades superadas:
   - Link do repositório:

### Próximos Passos
1. **Curto Prazo**
   - Completar exercícios básicos
   - Desenvolver primeiro projeto
   - Revisar conceitos difíceis

2. **Médio Prazo**
   - Projetos mais complexos
   - Contribuir em projetos open source
   - Participar de desafios de código

## Recursos Adicionais

### Comunidade
- Discord Python Brasil
- Stack Overflow em Português
- GitHub Discussions
- Reddit r/learnpython

### Livros Recomendados
1. "Python para Todos" - Charles Severance
2. "Automatize Tarefas Maçantes com Python"
3. "Python Crash Course"
4. "Pense em Python"

### Ferramentas Úteis
1. **Debugging**
   - Python Debugger (pdb)
   - VSCode Debugger
   - Print Debugging

2. **Formatação**
   - Black
   - Pylint
   - Flake8

## Preparação para Avaliações

### Teoria
- [ ] Revisar conceitos básicos
- [ ] Fazer mapas mentais
- [ ] Criar flashcards
- [ ] Resolver questões antigas

### Prática
- [ ] Refazer exercícios
- [ ] Criar novos projetos
- [ ] Explicar código para outros
- [ ] Participar de code reviews 