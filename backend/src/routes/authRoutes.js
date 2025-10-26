import express from 'express';
import { 
  register, 
  login, 
  verifyOTP, 
  forgotPassword, 
  resetPassword,
  validateResetToken,
  adminResetPassword 
} from '../controllers/authController.js';

const router = express.Router();

// Registration Route
router.post('/register', register);

// OTP Verification Route
router.post('/verify-otp', verifyOTP);

// Login Route
router.post('/login', login);

// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password', resetPassword);

// Validate Reset Token Route
router.post('/validate-reset-token', validateResetToken);

// Admin Password Reset Route (use with extreme caution)
router.post('/admin-reset-password', adminResetPassword);

export default router;
