
'use strict';

const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  lazyConnect: true
});

// Get data from cache
async function cacheGet(key) {
  try {
    const data = await redis.get(key);

    if (data === null) {
      return null;
    }

    return JSON.parse(data);
  } catch (err) {
    console.error('[cache] GET error:', err.message);
    return null;
  }
}

// Store data in cache with TTL
async function cacheSet(key, data, ttlSeconds) {
  try {
    await redis.set(
      key,
      JSON.stringify(data),
      'EX',
      ttlSeconds
    );
  } catch (err) {
    console.error('[cache] SET error:', err.message);
  }
}

// Delete data from cache
async function cacheDel(key) {
  try {
    await redis.del(key);
  } catch (err) {
    console.error('[cache] DEL error:', err.message);
  }
}

module.exports = { cacheGet, cacheSet, cacheDel };

