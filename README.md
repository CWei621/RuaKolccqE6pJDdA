# 護士站點管理系統 / Nurse Station Management System

## 安裝 / Installation

### 1. 複製專案 / Clone the project
```sh
git clone ${URL}
```

### 2. 配置檔案設定 / Configuration file setup
- 複製設定檔範本 / Copy the configuration template:
```sh
cp src/main/resources/application.properties src/main/resources/application-prod.properties
```
- 調整application-prod.properties內容 / Adjust the content of application-prod.properties
```
spring.datasource.url=jdbc:postgresql://postgres:5432/${DB}
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. 調整環境變數 / Set environment variables
- 複製.env.example / Copy .env.example
```sh
cp .env.example .env
```
- 調整.env / Adjust .env

## 部署 / Deployment
- 建立映像檔 / Build the image
```sh
docker compose build
```
- 啟動服務 / Start services
```sh
docker compose up -d
```
  
## 注意事項 / Notes
開發環境使用 application.properties / Development environment uses application.properties
生產環境使用 application-prod.properties / Production environment uses application-prod.properties
請勿提交 application-prod.properties 到版本控制 / Do not commit application-prod.properties to version control