class MemoryCache {
  constructor(maxSize = 100, ttl = 3600000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
    this.expiryTimes = new Map();
  }

  set(key, value) {
  
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
      this.expiryTimes.delete(firstKey);
    }

    this.cache.set(key, value);
    this.expiryTimes.set(key, Date.now() + this.ttl);
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    
    const expiryTime = this.expiryTimes.get(key);
    if (Date.now() > expiryTime) {
      this.cache.delete(key);
      this.expiryTimes.delete(key);
      return null;
    }

    return this.cache.get(key);
  }

  has(key) {
    if (!this.cache.has(key)) {
      return false;
    }

    const expiryTime = this.expiryTimes.get(key);
    if (Date.now() > expiryTime) {
      this.cache.delete(key);
      this.expiryTimes.delete(key);
      return false;
    }

    return true;
  }

  clear() {
    this.cache.clear();
    this.expiryTimes.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl,
    };
  }
}

module.exports = MemoryCache;
