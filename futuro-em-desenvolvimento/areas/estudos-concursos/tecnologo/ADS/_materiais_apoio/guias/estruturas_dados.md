# Guia de Estruturas de Dados

## Roteiro de Estudos

### 1. Conceitos Básicos
- **Semana 1-2**: Introdução
  - [ ] Complexidade de Algoritmos
  - [ ] Notação Big O
  - [ ] Análise de Desempenho
  - [ ] Recursividade

- **Semana 3-4**: Arrays e Strings
  - [ ] Arrays Unidimensionais
  - [ ] Arrays Multidimensionais
  - [ ] Manipulação de Strings
  - [ ] Algoritmos de Busca

### 2. Estruturas Lineares
- **Semana 5-6**: Listas
  - [ ] Listas Encadeadas
  - [ ] Listas Duplamente Encadeadas
  - [ ] Listas Circulares
  - [ ] Operações Básicas

- **Semana 7-8**: Pilhas e Filas
  - [ ] Pilhas (LIFO)
  - [ ] Filas (FIFO)
  - [ ] Deques
  - [ ] Aplicações Práticas

### 3. Estruturas Hierárquicas
- **Semana 9-10**: Árvores
  - [ ] Árvores Binárias
  - [ ] Árvores de Busca
  - [ ] Árvores AVL
  - [ ] Árvores B

- **Semana 11-12**: Grafos
  - [ ] Representação
  - [ ] Busca em Profundidade
  - [ ] Busca em Largura
  - [ ] Algoritmos de Caminho

## Implementações Práticas

### Arrays e Listas
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        if not self.head:
            self.head = Node(data)
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = Node(data)
```

### Pilhas e Filas
```python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        return self.items.pop()
    
    def is_empty(self):
        return len(self.items) == 0

class Queue:
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        self.items.insert(0, item)
    
    def dequeue(self):
        return self.items.pop()
```

### Árvores
```python
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        if not self.root:
            self.root = TreeNode(data)
        else:
            self._insert_recursive(self.root, data)
    
    def _insert_recursive(self, node, data):
        if data < node.data:
            if node.left is None:
                node.left = TreeNode(data)
            else:
                self._insert_recursive(node.left, data)
        else:
            if node.right is None:
                node.right = TreeNode(data)
            else:
                self._insert_recursive(node.right, data)
```

## Visualizações

### Representações Visuais
1. **Lista Encadeada**
```
[Node1] -> [Node2] -> [Node3] -> None
```

2. **Árvore Binária**
```
     [Root]
    /      \
[Left]    [Right]
```

3. **Grafo**
```
(A) --- (B)
 |       |
(C) --- (D)
```

## Exercícios Práticos

### Nível 1: Básico
1. **Manipulação de Arrays**
   - Inversão
   - Rotação
   - Busca Linear
   - Remoção de Duplicatas

2. **Operações com Listas**
   - Inserção
   - Remoção
   - Busca
   - Concatenação

### Nível 2: Intermediário
1. **Pilhas e Filas**
   - Validador de Parênteses
   - Conversor Infix para Postfix
   - Fila de Prioridades
   - Simulador de Processos

2. **Árvores**
   - Travessias (in-order, pre-order, post-order)
   - Busca de Elementos
   - Balanceamento
   - Altura e Profundidade

## Projetos Práticos

### Projeto 1: Gerenciador de Tarefas
- Lista de tarefas com prioridades
- Ordenação por diferentes critérios
- Categorização
- Histórico de completude

### Projeto 2: Simulador de Estruturas
- Visualização de operações
- Análise de complexidade
- Comparação de desempenho
- Interface interativa

## Dicas para TDAH

### Visualização
1. **Diagramas**
   - Use cores diferentes
   - Faça desenhos simples
   - Anote os passos
   - Revise visualmente

2. **Animações**
   - Use visualizadores online
   - Crie animações simples
   - Observe o passo a passo
   - Faça anotações

### Prática
1. **Implementação**
   - Comece com exemplos simples
   - Adicione comentários
   - Teste cada parte
   - Use debugger visual

2. **Exercícios**
   - Divida em partes menores
   - Faça um checklist
   - Celebre cada etapa
   - Revise regularmente

## Recursos de Aprendizagem

### Ferramentas
1. **Visualizadores**
   - [VisuAlgo](https://visualgo.net/)
   - [Python Tutor](http://pythontutor.com/)
   - [Data Structure Visualizations](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)

2. **IDEs**
   - PyCharm com debugger visual
   - VSCode com extensões Python
   - Jupyter para experimentação

### Material Complementar
1. **Livros**
   - "Estruturas de Dados e Algoritmos em Python"
   - "Problem Solving with Algorithms and Data Structures"
   - "Grokking Algorithms"

2. **Cursos Online**
   - Coursera: Algorithms and Data Structures
   - edX: Data Structures Fundamentals
   - Udacity: Data Structures & Algorithms in Python

## Avaliação de Progresso

### Checklist de Conceitos
- [ ] Complexidade de Algoritmos
- [ ] Estruturas Lineares
- [ ] Estruturas Hierárquicas
- [ ] Algoritmos de Busca/Ordenação
- [ ] Aplicações Práticas

### Projetos Desenvolvidos
1. **Projeto**: [Nome]
   - Estruturas utilizadas:
   - Desafios superados:
   - Melhorias possíveis:
   - Link do código:

## Preparação para Avaliações

### Teoria
- [ ] Revisar complexidade
- [ ] Estudar casos especiais
- [ ] Fazer mapas mentais
- [ ] Resolver exercícios antigos

### Prática
- [ ] Implementar estruturas básicas
- [ ] Resolver problemas variados
- [ ] Analisar complexidade
- [ ] Otimizar soluções 