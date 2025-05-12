if (typeof globalThis.crypto === 'undefined') {
  try {
    globalThis.crypto = require('crypto').webcrypto;
  } catch (err) {
    console.warn('Web crypto not available in this environment');
  }
}
