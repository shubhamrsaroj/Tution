import express from 'express';
import { 
  register, 
  login, 
  forgotPassword, 
  resetPassword,
  validateResetToken,
  adminResetPassword 
} from '../controllers/authController.js';

const router = express.Router();

// Registration Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Forgot Password Routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/validate-reset-token', validateResetToken);

// Admin Emergency Reset
router.post('/admin-reset-password', adminResetPassword);

export default router;
