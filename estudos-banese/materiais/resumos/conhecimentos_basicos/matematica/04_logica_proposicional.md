# Lógica Proposicional 🧠

## 🎯 Guia Rápido
- Entenda o que é uma proposição
- Domine os conectivos lógicos
- Pratique tabelas-verdade

## 1. Proposições 📝
### Conceito:
- **Definição**: Frase declarativa com valor verdadeiro ou falso
- **Símbolos**: V (verdadeiro) e F (falso)
- **Notação**: p, q, r (letras minúsculas)

### Tipos:
- **Simples**: Uma única afirmação
- **Composta**: Combina proposições simples
- **Abertas**: Contém variáveis

## 2. Conectivos Lógicos ⚡
### Negação (¬):
- **Símbolo**: ¬p ou ~p
- **Significado**: "não p"
- **Efeito**: Inverte o valor lógico

### Conjunção (∧):
- **Símbolo**: p ∧ q
- **Significado**: "p e q"
- **Verdadeiro**: Apenas quando ambos são V

### Disjunção (∨):
- **Símbolo**: p ∨ q
- **Significado**: "p ou q"
- **Falso**: Apenas quando ambos são F

### Condicional (→):
- **Símbolo**: p → q
- **Significado**: "se p então q"
- **Falso**: Apenas quando p=V e q=F

### Bicondicional (↔):
- **Símbolo**: p ↔ q
- **Significado**: "p se e somente se q"
- **Verdadeiro**: Quando p e q têm mesmo valor

## 3. Tabelas-Verdade 📊
### Estrutura:
- Lista todas combinações possíveis
- 2ⁿ linhas (n = número de proposições)
- Última coluna mostra resultado final

### Exemplo:
```
p | q | p ∧ q
V | V |   V
V | F |   F
F | V |   F
F | F |   F
```

## 4. Tautologia e Contradição 🔄
### Tautologia:
- **Definição**: Sempre verdadeira
- **Exemplo**: p ∨ ¬p
- **Aplicação**: Leis lógicas

### Contradição:
- **Definição**: Sempre falsa
- **Exemplo**: p ∧ ¬p
- **Aplicação**: Provas por absurdo

## 5. Equivalência Lógica ⚖️
### Conceito:
- **Definição**: Mesma tabela-verdade
- **Notação**: p ≡ q
- **Exemplo**: p → q ≡ ¬p ∨ q

### Principais Equivalências:
- **Dupla Negação**: ¬(¬p) ≡ p
- **De Morgan**: ¬(p ∧ q) ≡ ¬p ∨ ¬q
- **Contraposição**: (p → q) ≡ (¬q → ¬p)

## 6. Argumentos Lógicos 🎯
### Estrutura:
- **Premissas**: Proposições iniciais
- **Conclusão**: Proposição final
- **Validade**: Conclusão segue das premissas

### Tipos:
- **Modus Ponens**: p→q, p ∴ q
- **Modus Tollens**: p→q, ¬q ∴ ¬p
- **Silogismo**: p→q, q→r ∴ p→r

## 📌 Dicas de Estudo
1. Pratique construção de tabelas-verdade
2. Memorize as equivalências principais
3. Resolva muitos exercícios de argumentação
4. Use diagramas para visualizar relações
5. Relacione com situações do dia a dia