"use server"

import Redis from 'ioredis';

export async function getLeaderBoard() {
    // Dummy Redis URL placeholder
    const redisUrl = "redis://default:dummy-password@example-redis-host:6379";
    const redis = new Redis(redisUrl);
    const res = await redis.lrange("leaderboard", 0, -1);
    redis.quit();
    console.log(res);
}
