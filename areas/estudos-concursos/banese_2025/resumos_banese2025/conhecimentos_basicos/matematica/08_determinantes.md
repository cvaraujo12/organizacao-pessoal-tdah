# Determinantes 🎯

## 🎯 Guia Rápido
- Entenda o conceito
- Domine os métodos de cálculo
- Pratique propriedades

## 1. Conceitos Básicos 📝
### Definição:
- **Determinante**: Número associado a uma matriz quadrada
- **Notação**: det(A) ou |A|
- **Aplicações**: Sistemas lineares, matriz inversa

### Ordem:
- **1ª ordem**: |a| = a
- **2ª ordem**: |A| = ad - bc
- **3ª ordem**: Regra de Sarrus

## 2. Cálculo de Determinantes 🔢
### 2ª Ordem:
```
|a b|
|c d| = ad - bc
```

### 3ª Ordem (Sarrus):
- **Diagonal principal**: + (aei + bfg + cdh)
- **Diagonal secundária**: - (ceg + bdi + afh)
- **Regra prática**: Diagonais para direita (+) e esquerda (-)

### Ordem Superior:
- Teorema de Laplace
- Cofatores
- Expansão em linha/coluna

## 3. Propriedades 📋
### Básicas:
- det(A) = det(Aᵀ)
- det(kA) = kⁿdet(A)
- det(AB) = det(A)det(B)

### Operações:
- **Troca de linhas**: Muda o sinal
- **Multiplicação por k**: Multiplica por k
- **Linha nula**: det = 0
- **Soma de linha**: det não muda

## 4. Teorema de Laplace 📊
### Conceito:
- Expansão por linha/coluna
- Usa cofatores
- Escolha linha/coluna com mais zeros

### Fórmula:
- det(A) = Σ aᵢⱼ × Cᵢⱼ
- Cᵢⱼ = (-1)ᶦ⁺ʲ × Mᵢⱼ

## 5. Cofatores e Adjunta 🔄
### Cofator:
- Cᵢⱼ = (-1)ᶦ⁺ʲ × Mᵢⱼ
- Mᵢⱼ = menor complementar

### Matriz Adjunta:
- adj(A) = (Cᵢⱼ)ᵀ
- A × adj(A) = det(A) × I

## 6. Aplicações 💡
### Matriz Inversa:
- A⁻¹ = adj(A)/det(A)
- Existe se det(A) ≠ 0

### Sistemas Lineares:
- Regra de Cramer
- det(A) ≠ 0 → Sistema possível e determinado

### Área e Volume:
- Área do paralelogramo
- Volume do paralelepípedo

## 7. Regra de Cramer 🎲
### Quando usar:
- Sistema possível e determinado
- det(A) ≠ 0
- Matriz quadrada

### Fórmula:
- xᵢ = det(Aᵢ)/det(A)
- Aᵢ: Substitui coluna i por termos independentes

## 📌 Dicas de Estudo
1. Pratique cálculos básicos
2. Memorize propriedades
3. Use regra de Sarrus
4. Faça expansão por zeros
5. Resolva sistemas por Cramer