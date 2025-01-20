#!/bin/bash

# Criar estrutura de pastas necessária
mkdir -p src/components/PriorityView
mkdir -p public/audio
mkdir -p public/styles

# Copiar arquivos de configuração
cp src/components/PriorityView/config.json config/priority-view.json
cp public/audio/sounds.json config/sounds.json

# Instalar dependências adicionais
npm install @emotion/react @emotion/styled

# Configurar variáveis de ambiente
echo "REACT_APP_API_URL=http://localhost:3000" > .env
echo "REACT_APP_ENABLE_SOUNDS=true" >> .env

echo "Ambiente configurado com sucesso!" 