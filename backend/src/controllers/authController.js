import User from '../models/User.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import { sendPasswordResetEmail } from '../utils/emailService.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Exam Preparation Platform',
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
  };

  await transporter.sendMail(mailOptions);
};

// Register User
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Create username from first and last name
    const username = `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, '');

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new user
    user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      otp: { 
        code: otp, 
        expiresAt: otpExpires 
      }
    });

    await user.save();

    // Send OTP Email
    await sendOTPEmail(email, otp);

    res.status(201).json({ 
      message: 'User registered. Please verify your email.',
      userId: user._id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check OTP
    if (user.otp.code !== otp || user.otp.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
      console.log('Existing users:', await User.find({}, 'email'));
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Detailed user verification logging
    console.log('User found:', {
      email: user.email,
      isVerified: user.isVerified,
      username: user.username
    });

    // Check if verified
    if (!user.isVerified) {
      console.log(`Login attempt failed: User ${normalizedEmail} is not verified`);
      return res.status(403).json({ message: 'Please verify your email' });
    }

    // Compare passwords with detailed logging
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login attempt failed: Incorrect password for user ${normalizedEmail}`);
      console.log('Password comparison details:', {
        inputPasswordLength: password.length,
        storedPasswordHash: user.password.substring(0, 20) + '...' // Partial hash for debugging
      });
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
        // Add these fields to support full name display
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
