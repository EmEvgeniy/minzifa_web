#!/bin/bash

# Скрипт для генерации самоподписанного SSL-сертификата для локальной разработки

CERT_DIR="nginx/ssl"
DOMAIN="minzifatravel.com"

echo "🔐 Генерация самоподписанного SSL-сертификата для ${DOMAIN}..."

# Создаём директорию, если её нет
mkdir -p "${CERT_DIR}"

# Генерируем приватный ключ и сертификат
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "${CERT_DIR}/key.pem" \
  -out "${CERT_DIR}/cert.pem" \
  -subj "/C=RU/ST=State/L=City/O=Organization/CN=${DOMAIN}" \
  -addext "subjectAltName=DNS:${DOMAIN},DNS:*.${DOMAIN}"

if [ $? -eq 0 ]; then
  echo "✅ SSL-сертификат успешно создан:"
  echo "   📄 Сертификат: ${CERT_DIR}/cert.pem"
  echo "   🔑 Приватный ключ: ${CERT_DIR}/key.pem"
  echo ""
  echo "⚠️  Это самоподписанный сертификат для локальной разработки."
  echo "   Браузер покажет предупреждение о безопасности - это нормально."
  echo "   Просто примите сертификат для продолжения работы."
else
  echo "❌ Ошибка при генерации сертификата"
  exit 1
fi
