import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

// Create a new rate limiter, that allows 100 requests per minute
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, '50 s'), // 50 requests per 50 seconds
});

export default rateLimit;
