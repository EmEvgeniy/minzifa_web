#!/bin/bash

# Скрипт для включения локального домена (для разработки)

DOMAIN="minzifatravel.com"
HOSTS_FILE="/etc/hosts"

echo "🔧 Включение локального домена ${DOMAIN}..."

# Проверяем, есть ли закомментированная запись
if grep -q "^# 127.0.0.1 ${DOMAIN}" "${HOSTS_FILE}"; then
  # Раскомментируем существующую запись
  sudo sed -i '' "s/^# 127.0.0.1 ${DOMAIN}/127.0.0.1 ${DOMAIN}/" "${HOSTS_FILE}"
  echo "✅ Локальный домен ${DOMAIN} включён (раскомментирован)"
elif grep -q "^127.0.0.1 ${DOMAIN}" "${HOSTS_FILE}"; then
  echo "✅ Локальный домен ${DOMAIN} уже включён"
else
  # Добавляем новую запись
  echo "127.0.0.1 ${DOMAIN}" | sudo tee -a "${HOSTS_FILE}" > /dev/null
  echo "✅ Локальный домен ${DOMAIN} добавлен и включён"
fi

echo ""
echo "🌐 Теперь https://${DOMAIN} будет открывать локальный dev-сервер"
echo "   Запустите: npm run dev:docker"
