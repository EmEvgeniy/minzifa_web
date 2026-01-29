#!/bin/bash

# Скрипт для отключения локального домена (для доступа к продакшну)

DOMAIN="minzifatravel.com"
HOSTS_FILE="/etc/hosts"

echo "🔧 Отключение локального домена ${DOMAIN}..."

# Проверяем, есть ли активная запись
if grep -q "^127.0.0.1 ${DOMAIN}" "${HOSTS_FILE}"; then
  # Комментируем запись
  sudo sed -i '' "s/^127.0.0.1 ${DOMAIN}/# 127.0.0.1 ${DOMAIN}/" "${HOSTS_FILE}"
  echo "✅ Локальный домен ${DOMAIN} отключён (закомментирован)"
elif grep -q "^# 127.0.0.1 ${DOMAIN}" "${HOSTS_FILE}"; then
  echo "✅ Локальный домен ${DOMAIN} уже отключён"
else
  echo "ℹ️  Запись для ${DOMAIN} не найдена в ${HOSTS_FILE}"
fi

echo ""
echo "🌐 Теперь https://${DOMAIN} будет открывать продакшн-сервер"
