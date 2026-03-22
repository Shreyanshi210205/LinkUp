import express from "express";
import dotenv from "dotenv";
import RedisImport from "ioredis";
dotenv.config();
const Redis = RedisImport.default || RedisImport;
const redis = new Redis(process.env.REDIS_URL || '', {
    tls: {},
});
redis.on("connecting", () => {
    console.log("Connecting...");
});
redis.on("connect", () => {
    console.log("Connected");
});
redis.on("error", (err) => {
    console.error("🔴 Redis error:", err);
});
const app = express();
const PORT = process.env.PORT || 5000;
console.log("URL:", JSON.stringify(process.env.REDIS_URL));
app.get("/", async (req, res) => {
    try {
        await redis.set("msg", "working");
        const val = await redis.get("msg");
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