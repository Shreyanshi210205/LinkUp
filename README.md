# 🚀 LinkUp

<div align="center">

# LinkUp — Distributed Real-Time Chat Platform

A scalable microservices-based real-time chat application built using Next.js, Node.js, Socket.IO, RabbitMQ, Redis, and MongoDB.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.IO-black?style=for-the-badge&logo=socketdotio)
![Redis](https://img.shields.io/badge/Redis-red?style=for-the-badge&logo=redis)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-orange?style=for-the-badge&logo=rabbitmq)
![Docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker)

</div>

---

# 📖 Overview

LinkUp is a distributed real-time chat platform that follows a microservices architecture.

The system consists of:

- User Service
- Mail Service
- Chat Service
- Next.js Frontend

RabbitMQ enables asynchronous communication between services, Redis stores temporary OTP data, while Socket.IO powers real-time messaging.

---

# ✨ Features

- 🔐 OTP Authentication
- ⚡ Real-Time Messaging
- 📨 RabbitMQ Message Queues
- 🚀 Redis OTP Caching
- 👥 One-to-One Chats
- 🍪 JWT Authentication
- 🔄 Microservices Architecture
- ☁️ Upstash Redis Integration
- 🐳 Dockerized RabbitMQ
- 📱 Responsive UI

---

# 🏗 Architecture

```text
                ┌────────────────┐
                │   Next.js UI   │
                │   Frontend     │
                └───────┬────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼                           ▼

┌────────────────┐          ┌────────────────┐
│ User Service   │          │ Chat Service   │
│ Port : 5000    │◄────────►│ Port : 5002    │
└───────┬────────┘          └───────┬────────┘
        │                           │
        ▼                           ▼
   Upstash Redis               MongoDB

        │
        ▼

┌────────────────┐
│ RabbitMQ Queue │
└───────┬────────┘
        ▼
┌────────────────┐
│ Mail Service   │
│ Port : 5001    │
└────────────────┘
```

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- Context API
- Tailwind CSS
- Socket.IO Client

## Backend

- Node.js
- Express.js
- TypeScript
- Socket.IO

## Database

- MongoDB

## Cache

- Upstash Redis

## Queue

- RabbitMQ

## Containerization

- Docker

---

# 📂 Project Structure

```bash
LinkUp/
│
├── frontend/
│
├── backend/
│   │
│   ├── user/
│   │   └── src/
│   │
│   ├── mail/
│   │
│   └── chat/
│       └── src/
│
└── .postman/
```

---

# ⚙ Environment Variables

## User Service (.env)

```env
MONGO_URI=

PORT=5000

REDIS_URL=

RabbitMQ_Host=

RabbitMQ_Username=

RabbitMQ_Password=

JWT_SECRET=
```

---

## Mail Service (.env)

```env
PORT=5001

RabbitMQ_Host=

RabbitMQ_Username=

RabbitMQ_Password=

USER_EMAIL=

USER_PASS=
```

---

## Chat Service (.env)

```env
PORT=5002

MONGO_URI=

JWT_SECRET=

USER_SERVICE=http://localhost:5000

CLOUD_NAME=

API_KEY=

API_SECRET=
```

---

# 🐳 RabbitMQ Setup

RabbitMQ is containerized using Docker.

```bash
docker run -d \
--hostname rabbitmq \
--name rabbitmq \
-p 5672:5672 \
-p 15672:15672 \
rabbitmq:3-management
```

RabbitMQ Dashboard:

```text
http://localhost:15672
```

---

# 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/linkup.git

cd LinkUp
```

---

# Install Dependencies

## Frontend

```bash
cd frontend

npm install
```

## User Service

```bash
cd backend/user

npm install
```

## Mail Service

```bash
cd backend/mail

npm install
```

## Chat Service

```bash
cd backend/chat

npm install
```

---

# ▶ Running the Application

Open four terminals.

## Terminal 1

```bash
cd backend/user

npm run dev
```

Runs on:

```text
http://localhost:5000
```

---

## Terminal 2

```bash
cd backend/mail

npm run dev
```

Runs on:

```text
http://localhost:5001
```

---

## Terminal 3

```bash
cd backend/chat

npm run dev
```

Runs on:

```text
http://localhost:5002
```

---

## Terminal 4

```bash
cd frontend

npm run dev
```

Runs on:

```text
http://localhost:3000
```

---

# 🔄 OTP Flow

```text
User
   │
   ▼
User Service
   │
   ▼
RabbitMQ Queue
   │
   ▼
Mail Service
   │
   ▼
OTP Sent
   │
   ▼
Redis Storage
   │
   ▼
OTP Verification
```

---

# 💬 Chat Flow

```text
User A
   │
Socket.IO
   │
Chat Service
   │
MongoDB
   │
Socket.IO
   │
User B
```

---

# 🔐 Authentication

- OTP-based verification
- JWT token generation
- HTTP-only cookies
- Protected routes

---

# 📈 Future Improvements

- Group Chats
- Typing Indicators
- Read Receipts
- Message Reactions
- Media Sharing
- Push Notifications
- Kubernetes Deployment
- End-to-End Encryption

---

# 👨‍💻 Author

**Shreyanshi Srivastava**

B.Tech CSE, IIIT Bhagalpur

---

# ⭐ Support

If you like this project, consider giving it a star.

```
⭐ Star the repository if you found it helpful.
```

---

<div align="center">

Built with ❤️ using Next.js, Node.js, MongoDB, Socket.IO, RabbitMQ, Redis, and Docker.

</div>
