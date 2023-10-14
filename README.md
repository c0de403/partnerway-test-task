# Partnerway (Spendbase) Test Task

## 📁 Installation
1. Clone the repository:
    ```bash
    git clone [https://github.com/WhatIsLove007/partnerway-test-task.git]
    ```
2. Install the dependencies on your system:
    ```bash
    npm install
    ```

## 💻 Project Configuration
1. Create .env from .env.example and set relevant values.
2. Copy from `docker-compose.example` and paste into your own `docker-compose.yml`.
3. If you use `docker-compose.yml` from `docker-compose.example`, in order to install all your dependencies in your node_modules docker volume you need to run:
   ```bash
   docker compose run --rm backend npm i
   ```
4. After installation run the containers:
   ```bash
   docker compose up -d; docker logs backend -f
   ```
5. If you need to access the backend container and execute bash commands, use:
   ```bash
   docker exec -it backend bash
   ```
5. For stopping and removing your running containers, use:
   ```bash
   docker compose down
   ```

## 🚀  Migrations
1. To run all pending migrations:
    ```bash
    npm run db:migrate
    ```

## 🧪 Running Unit Tests
1. To run the unit tests for the application:
   ```bash
   npm run test
   ```