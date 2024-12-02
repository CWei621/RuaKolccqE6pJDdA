#!/bin/sh
set -e

# 等待数据库启动
echo "啟動資料庫..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
  if wget --spider --quiet http://postgres:5432; then
    echo "資料庫已啟動"
    break
  fi
  
  attempt=$((attempt+1))
  echo "等待資料庫啟動... - 嘗試第 $attempt/$max_attempts 次"
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "資料庫啟動超時"
  exit 1
fi

echo "啟動Spring Boot"
exec java \
  -XX:+UseContainerSupport \
  -XX:MaxRAMPercentage=75.0 \
  -Djava.security.egd=file:/dev/./urandom \
  -jar /app/app.jar