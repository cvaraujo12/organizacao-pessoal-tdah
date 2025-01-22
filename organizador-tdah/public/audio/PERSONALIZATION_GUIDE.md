# Guia de Personalização de Sons

Este guia explica como personalizar os sons do sistema para criar uma experiência mais agradável e motivadora.

## Temas Sonoros Disponíveis

### 1. Minimalista (Padrão)
- Sons suaves e discretos
- Ideal para ambientes de trabalho
- Foco na não-distração

### 2. Natureza
- Sons inspirados em elementos naturais
- Promove calma e concentração
- Ideal para redução de ansiedade

### 3. Game Style
- Sons estilo videogame retrô
- Mais energético e motivador
- Ideal para gamificação

## Como Personalizar

### Escolher Tema
```bash
/som_tema [nome_tema]
```
Exemplo: `/som_tema natureza`

### Testar Sons
```bash
/som_preview [tipo_som]
```
Exemplo: `/som_preview pequena`

### Ajustar Volume Individual
```bash
/som_ajuste [tipo_som] [volume]
```
Exemplo: `/som_ajuste pequena 80`

### Upload de Sons Personalizados
```bash
/som_upload [tipo_som] [arquivo]
```
- Formatos aceitos: MP3, WAV
- Tamanho máximo: 500KB
- Duração máxima: 3 segundos

## Dicas para TDAH

1. **Escolha Sons Não-Distrativos**
   - Evite sons muito longos
   - Prefira sons que não quebram seu foco
   - Teste diferentes opções em momentos diferentes do dia

2. **Ajuste o Volume Estrategicamente**
   - Sons importantes podem ser mais altos
   - Conquistas menores podem ter volume mais baixo
   - Considere o ambiente ao seu redor

3. **Use Temas Conforme seu Humor**
   - Minimalista para momentos de foco intenso
   - Natureza para momentos de ansiedade
   - Game Style para aumentar motivação

4. **Personalize Gradualmente**
   - Comece com o tema padrão
   - Faça pequenos ajustes
   - Observe o que funciona melhor para você

## Resolução de Problemas

- Se um som não carregar, use `/som_reset`
- Para voltar ao padrão, use `/som_tema padrao`
- Para desativar temporariamente, use `/som_toggle` 