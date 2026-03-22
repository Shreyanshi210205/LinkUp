import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
export const redisClient = createClient({
    url: process.env.REDIS_URL || '',
});
redisClient
    .connect()
    .then(() => console.log("connected to redis"))
    .catch(console.error);
redisClient.on("error", (err) => {
    console.error("🔴 Redis error:", err);
});
const app = express();
const PORT = process.env.PORT || 5000;
//test route for redis connection
app.get("/", async (req, res) => {
    try {
        await redisClient.set("msg", "working");
        const val = await redisClient.get("msg");
        res.json({ val });
    }
    catch (err) {
        res.status(500).json({ error: "Redis failed" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
//# sourceMappingURL=index.js.map