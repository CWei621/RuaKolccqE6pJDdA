# 護士站點管理系統

## 系統需求
- Java 17
- Maven 3.8+
- Docker & Docker Compose
- PostgreSQL 15+

## 安裝

### 1. 複製專案
```sh
git clone https://github.com/yourusername/nurse-schedule.git
cd nurse-schedule
```

### 2. 配置檔案設定
- 複製設定檔範本：
```sh
cp src/main/resources/application.properties src/main/resources/application-prod.properties
```
- 調整application-prod.properties內容
```
spring.datasource.url=jdbc:postgresql://postgres:5432/nurse-schedule
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. docker 部署
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