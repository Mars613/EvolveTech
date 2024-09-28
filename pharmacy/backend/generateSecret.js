const crypto = require('crypto');

// Generate 48 random bytes and encode them in base64
const jwtSecret = crypto.randomBytes(48).toString('base64');

console.log(jwtSecret);
