const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
});

// In production with multiple instances,
// use RedisStore (rate-limit-redis) because
// MemoryStore keeps separate counters per server.

module.exports = authLimiter;