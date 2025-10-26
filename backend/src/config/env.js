require('dotenv').config();

module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // MongoDB Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tution',

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_development_secret_key_123!@#',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',

  // Email Configuration
  EMAIL_CONFIG: {
    HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    PORT: process.env.EMAIL_PORT || 587,
    USER: process.env.EMAIL_USER || 'shubhamrsaroj229@gmail.com',
    PASS: process.env.EMAIL_PASS || 'efclfylixqlzaftc'
  },

  // Frontend Configuration
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};
