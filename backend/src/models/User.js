import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Add index to improve query performance and enforce uniqueness
  indexes: [
    { fields: { email: 1 }, unique: true },
    { fields: { username: 1 }, unique: true }
  ]
});

// Pre-save hook to ensure lowercase email and username
UserSchema.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  this.username = this.username.toLowerCase();
  next();
});

export default mongoose.model('User', UserSchema);
