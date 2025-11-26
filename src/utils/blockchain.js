/**
 * Blockchain Simulator Utilities
 * Simulates blockchain-like operations for the guestbook
 */

/**
 * Generate SHA-256 hash of a message
 * @param {string} message - The message to hash
 * @returns {Promise<string>} - Hex string of the hash
 */
export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Generate a random transaction ID
 * @returns {string} - A random transaction ID in the format 0x...
 */
export function generateTxId() {
  const chars = '0123456789abcdef';
  let txId = '0x';
  for (let i = 0; i < 64; i++) {
    txId += chars[Math.floor(Math.random() * chars.length)];
  }
  return txId;
}

/**
 * Create a blockchain block from a message
 * @param {string} message - The message content
 * @param {string} author - The author name
 * @returns {Promise<Object>} - A block object with hash, txId, timestamp, etc.
 */
export async function createBlock(message, author = 'Anonymous') {
  const timestamp = Date.now();
  const data = `${author}:${message}:${timestamp}`;
  const hash = await sha256(data);
  const txId = generateTxId();
  
  return {
    id: txId.slice(0, 10), // Short ID for display
    author,
    message,
    hash: hash.slice(0, 16) + '...', // Truncate for display
    txId: txId.slice(0, 18) + '...', // Truncate for display
    fullHash: hash,
    fullTxId: txId,
    timestamp,
    blockNumber: Math.floor(Math.random() * 1000000), // Simulated block number
  };
}

/**
 * Simulate mining delay (for visual effect)
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export function simulateMining(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
