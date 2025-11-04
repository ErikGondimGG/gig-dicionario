#!/bin/bash
set -e

SERVICE_NAME="gig-dicionario-frontend"
COMPOSE_FILE="docker-compose.yml"

echo "🧹 Limpando containers antigos..."
docker compose down --remove-orphans

echo "🔍 Verificando se a imagem já existe..."
IMAGE_EXISTS=$(docker images -q ${SERVICE_NAME})

if [ -z "$IMAGE_EXISTS" ]; then
  echo "📦 Nenhuma imagem encontrada. Criando build inicial..."
  docker compose build
else
  echo "✅ Imagem encontrada. Pulando build inicial."
fi

echo "🚀 Subindo o container..."
docker compose up -d

echo ""
echo "🌍 Projeto iniciado com sucesso!"
echo "Acesse: http://localhost:5173"
echo ""
echo "📜 Logs (Ctrl+C para sair):"
echo ""

docker compose logs -f ${SERVICE_NAME}
