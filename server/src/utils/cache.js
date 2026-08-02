const store = new Map();

/**
 * Get a cached value, or compute and cache it if missing/expired.
 * @param {string} key - cache key
 * @param {number} ttlMs - how long to keep the value, in milliseconds
 * @param {() => Promise<any>} fetcher - called on a cache miss
 */
async function getOrSet(key, ttlMs, fetcher) {
  const cached = store.get(key);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const value = await fetcher();

  store.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });

  return value;
}

module.exports = { getOrSet };
