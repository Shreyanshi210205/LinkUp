````md
# LinkUp

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/d7cb57a4-6587-4685-84b5-6d9a15a19142" />


A distributed real-time communication platform built using Socket.IO, Redis, RabbitMQ, and Docker to explore event-driven architecture, asynchronous processing, and low-latency messaging.

## Features

- OTP-based authentication system.
- Real-time messaging using Socket.IO.
- Asynchronous OTP processing using RabbitMQ.
- Redis-based OTP caching and expiration.
- Cookie-based authentication and protected routes.
- Persistent chat storage using MongoDB.
- Dockerized infrastructure for easy setup.
- Event-driven backend architecture.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | Next.js, TypeScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Real-Time | Socket.IO |
| Cache | Redis |
| Queue | RabbitMQ |
| DevOps | Docker |

## Installation

```bash
git clone https://github.com/yourusername/linkup.git
cd linkup

npm install
````

### Start Redis

```bash
docker run -d -p 6379:6379 redis
```

### Start RabbitMQ

```bash
docker run -d \
-p 5672:5672 \
-p 15672:15672 \
rabbitmq:3-management
```

### Run the application

```bash
npm run dev
```

## Project Structure

```bash
LinkUp/
│
├── frontend/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── sockets/
│
└── docker/
```

## Future Improvements

* Group chats
* Read receipts
* File sharing
* Push notifications
* End-to-end encryption
* Kubernetes deployment

## Author

**Shreyanshi Srivastava**

* GitHub
* LinkedIn
* Portfolio

```
```
