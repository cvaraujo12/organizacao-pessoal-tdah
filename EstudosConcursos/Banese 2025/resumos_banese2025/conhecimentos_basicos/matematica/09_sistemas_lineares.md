# Sistemas Lineares 🔢

## 🎯 Guia Rápido
- Entenda a classificação
- Domine os métodos de resolução
- Pratique interpretação geométrica

## 1. Conceitos Básicos 📝
### Definição:
- **Sistema Linear**: Conjunto de equações lineares
- **Equação Linear**: ax + by + cz = d
- **Incógnitas**: Variáveis a determinar
- **Coeficientes**: Números que multiplicam as incógnitas

### Classificação:
- **Possível e Determinado (SPD)**
- **Possível e Indeterminado (SPI)**
- **Impossível (SI)**

## 2. Representação Matricial 📊
### Matriz dos Coeficientes:
- **A**: Matriz dos coeficientes
- **X**: Matriz das incógnitas
- **B**: Matriz dos termos independentes

### Forma:
- AX = B
- Sistema homogêneo: AX = 0

## 3. Métodos de Resolução ⚡
### Substituição:
- Isola uma variável
- Substitui nas outras equações
- Resolve de trás para frente

### Adição:
- Multiplica equações por constantes
- Soma ou subtrai equações
- Elimina variáveis

### Escalonamento:
- Transforma em matriz triangular
- Operações elementares
- Resolve por substituição

## 4. Regra de Cramer 🎲
### Quando usar:
- Sistema quadrado (n equações, n incógnitas)
- det(A) ≠ 0

### Fórmula:
- xᵢ = det(Aᵢ)/det(A)
- Aᵢ: Matriz com coluna i substituída por B

## 5. Discussão de Sistemas 📈
### Teorema de Cramer:
- det(A) ≠ 0 → SPD
- det(A) = 0 e det(Aᵢ) ≠ 0 → SI
- det(A) = 0 e det(Aᵢ) = 0 → SPI

### Classificação:
- **SPD**: Única solução
- **SPI**: Infinitas soluções
- **SI**: Nenhuma solução

## 6. Sistemas Homogêneos 🔄
### Características:
- Termos independentes nulos
- Sempre tem solução trivial (0,0,0)
- det(A) = 0 → Tem solução não trivial

### Solução:
- Trivial: X = 0
- Não trivial: Infinitas soluções

## 7. Interpretação Geométrica 📐
### 2 Equações:
- **SPD**: Retas concorrentes
- **SPI**: Retas coincidentes
- **SI**: Retas paralelas

### 3 Equações:
- **SPD**: Planos com um ponto em comum
- **SPI**: Planos com reta em comum
- **SI**: Planos paralelos ou concorrentes em retas paralelas

## 📌 Dicas de Estudo
1. Pratique escalonamento
2. Memorize Regra de Cramer
3. Interprete geometricamente
4. Verifique soluções
5. Resolva sistemas variados