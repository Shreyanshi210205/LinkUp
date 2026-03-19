import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { createClient } from 'redis';
dotenv.config();
connectDb();
export const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        tls: true,
        rejectUnauthorized: false,
    },
});
redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err);
});
async function connectRedis() {
    try {
        console.log("Connecting to:", process.env.REDIS_URL);
        await redisClient.connect();
        console.log("Redis connected successfully 🚀");
    }
    catch (error) {
        console.error("Redis connection failed:", error);
    }
}
console.log(process.env.REDIS_URL);
connectRedis();
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map