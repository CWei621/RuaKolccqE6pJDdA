# 護士站點管理系統

## 安裝

### 1. 複製專案
```sh
git clone ${URL}
```

### 2. 配置檔案設定
- 複製設定檔範本：
```sh
cp src/main/resources/application.properties src/main/resources/application-prod.properties
```
- 調整application-prod.properties內容
```
spring.datasource.url=jdbc:postgresql://postgres:5432/${DB}
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. 調整環境變數
- 複製.env.example
```sh
cp .env.example .env
```
- 調整.env

## 部署
- 建立映像檔
```sh
docker compose build
```
- 啟動服務
```sh
docker compose up -d
```
  
## 注意事項
開發環境使用 application.properties
生產環境使用 application-prod.properties
請勿提交 application-prod.properties 到版本控制