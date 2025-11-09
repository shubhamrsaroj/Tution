import User from '../models/User.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import { sendPasswordResetEmail } from '../utils/emailService.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Create username from first and last name
    const username = `${firstName}${lastName}${Math.floor(Math.random() * 1000)}`.toLowerCase().replace(/\s+/g, '');

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Return credentials for direct login
    res.status(201).json({ 
      message: 'User registered successfully',
      credentials: {
        email: email,
        password: password  // IMPORTANT: Only send this for immediate login flow
      },
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle unique constraint violations
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Username or email is already taken',
        field: error.message.includes('email') ? 'email' : 'username'
      });
    }

    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();

    // Find user with case-insensitive email
    const user = await User.findOne({ 
      email: { 
        $regex: new RegExp(`^${normalizedEmail}$`, 'i') 
      } 
    });

    if (!user) {
      console.log(`Login attempt failed: No user found with email ${normalizedEmail}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login attempt failed: Incorrect password for user ${normalizedEmail}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    console.log(`Successful login for user ${normalizedEmail}`);

    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        role: user.role,
        firstName: user.firstName || '', 
        lastName: user.lastName || ''
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Create password reset token in database
    await PasswordResetToken.create({
      user: user._id,
      token: resetToken
    });

    // Send reset email
    const emailSent = await sendPasswordResetEmail(email, resetToken);
    
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send reset email' });
    }

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find reset token
    const resetTokenDoc = await PasswordResetToken.findOne({ token }).populate('user');
    
    if (!resetTokenDoc) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const user = resetTokenDoc.user;

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Delete reset token
    await PasswordResetToken.deleteOne({ _id: resetTokenDoc._id });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Validate Reset Token
export const validateResetToken = async (req, res) => {
  try {
    const { token } = req.body;

    // Find reset token
    const resetTokenDoc = await PasswordResetToken.findOne({ token }).populate('user');
    
    if (!resetTokenDoc) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Check if token is expired (created more than 1 hour ago)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (resetTokenDoc.createdAt < oneHourAgo) {
      // Delete expired token
      await PasswordResetToken.deleteOne({ _id: resetTokenDoc._id });
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Token is valid
    res.status(200).json({ 
      message: 'Reset token is valid',
      email: resetTokenDoc.user.email 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Emergency Admin Password Reset
export const adminResetPassword = async (req, res) => {
  try {
    const { email, newPassword, adminToken } = req.body;

    // Verify admin token (you should replace this with a secure method)
    if (adminToken !== process.env.ADMIN_RESET_TOKEN) {
      return res.status(403).json({ message: 'Unauthorized admin reset attempt' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and force verification
    user.password = hashedPassword;
    user.isVerified = true;
    await user.save();

    console.log(`Admin password reset for user: ${email}`);

    res.status(200).json({ message: 'Password successfully reset by admin' });
  } catch (error) {
    console.error('Admin password reset error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
