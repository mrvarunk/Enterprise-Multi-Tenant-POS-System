// Generate bcrypt hash for known passwords
const crypto = require('crypto');

// Simple bcrypt-compatible hash generator using Node.js
// We'll use the backend API to set passwords instead

const http = require('http');

// First, let's just output what we need
console.log('Users in DB:');
console.log('1. admin@pos.com  -> ROLE_ADMIN (ordinal 1)');
console.log('2. owner@pos.com  -> ROLE_STORE_MANAGER (ordinal 3)');
console.log('3. cashier@pos.com -> ROLE_CASHIER (ordinal 2)');
console.log('');
console.log('We need to reset passwords using BCrypt.');
console.log('Using $2a$10$ prefix for BCrypt hash of "admin123"');
