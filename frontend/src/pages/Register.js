import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { registerUser } from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailability, setUsernameAvailability] = useState({
    checking: false,
    available: false,
    message: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Password strength calculation
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (value.match(/[a-z]+/)) strength++;
      if (value.match(/[A-Z]+/)) strength++;
      if (value.match(/[0-9]+/)) strength++;
      if (value.match(/[$@#&!]+/)) strength++;
      setPasswordStrength(strength);
    }

    // Username availability check
    if (name === 'username') {
      // Reset availability when username changes
      setUsernameAvailability({
        checking: true,
        available: false,
        message: 'Checking username availability...'
      });

      // Simulated username availability check
      // In a real app, this would be an API call
      setTimeout(() => {
        const isValid = /^[a-zA-Z0-9_]{3,16}$/.test(value);
        const isAvailable = value.length >= 3 && value.length <= 16;
        
        setUsernameAvailability({
          checking: false,
          available: isValid && isAvailable,
          message: isValid && isAvailable 
            ? 'Username is available' 
            : 'Username must be 3-16 characters, alphanumeric or underscore'
        });
      }, 500);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate username
    if (!usernameAvailability.available) {
      setError('Please choose a valid username');
      setIsLoading(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Additional password strength validation
    if (passwordStrength < 3) {
      setError('Password is too weak. Include uppercase, lowercase, numbers, and special characters.');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data for registration
      const { confirmPassword, ...userData } = formData;
      const response = await registerUser(userData);
      
      // Store credentials for auto-fill in login
      localStorage.setItem('registeredCredentials', JSON.stringify({
        email: userData.email,
        password: userData.password
      }));

      // Navigate to login
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please log in.' 
        } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    // Placeholder for social registration functionality
    alert(`Social registration with ${provider} coming soon!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-center">
          <div className="flex justify-center mb-2">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Create Your Account
          </h2>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Inputs */}
          <div className="grid grid-cols-2 gap-2">
            {/* First Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="pl-8 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 text-sm"
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="pl-8 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 text-sm"
              />
            </div>
          </div>

          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`pl-8 w-full px-3 py-2 rounded-lg border ${
                usernameAvailability.checking 
                  ? 'border-yellow-300' 
                  : usernameAvailability.available 
                    ? 'border-green-500' 
                    : 'border-red-300'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 text-sm`}
            />
            {formData.username && (
              <div className={`text-xs mt-1 ${
                usernameAvailability.checking 
                  ? 'text-yellow-600' 
                  : usernameAvailability.available 
                    ? 'text-green-600' 
                    : 'text-red-600'
              }`}>
                {usernameAvailability.message}
              </div>
            )}
          </div>

          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="pl-8 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 text-sm"
            />
          </div>

          {/* Password Inputs */}
          <div className="grid grid-cols-2 gap-2">
            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pl-8 pr-8 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 text-sm"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                {showPassword ? 
                  <EyeOff className="h-4 w-4 text-gray-400" /> : 
                  <Eye className="h-4 w-4 text-gray-400" />
                }
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Confirm"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-8 pr-8 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 text-sm"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
              >
                {showConfirmPassword ? 
                  <EyeOff className="h-4 w-4 text-gray-400" /> : 
                  <Eye className="h-4 w-4 text-gray-400" />
                }
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div 
                key={level} 
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  level <= passwordStrength 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center">
            {passwordStrength === 0 && "Password strength"}
            {passwordStrength === 1 && "Very weak"}
            {passwordStrength === 2 && "Weak"}
            {passwordStrength === 3 && "Medium"}
            {passwordStrength === 4 && "Strong"}
            {passwordStrength === 5 && "Very strong"}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded text-xs relative" role="alert">
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading || !usernameAvailability.available}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 text-sm"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>

          {/* Social Registration Divider */}
          <div className="flex items-center justify-center my-2">
            <div className="border-t border-gray-300 flex-grow mr-2"></div>
            <span className="text-xs text-gray-500">Or register with</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>

          {/* Social Registration Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleSocialRegister('Google')}
              className="flex items-center justify-center py-1 px-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialRegister('Facebook')}
              className="flex items-center justify-center py-1 px-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path fill="#3F51B5" d="M42 37c0 2.762-2.238 5-5 5H11c-2.762 0-5-2.238-5-5V11c0-2.762 2.238-5 5-5h26c2.762 0 5 2.238 5 5v26z"/>
                <path fill="#FFF" d="M34.368 25H31v13h-5V25h-3v-4h3v-2.41c.002-3.508 1.459-5.59 5.592-5.59H35v4h-2.287c-1.624 0-1.727.615-1.727 1.766L31 21h4l-0.632 4z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialRegister('LinkedIn')}
              className="flex items-center justify-center py-1 px-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path fill="#0078D4" d="M42 37c0 2.762-2.238 5-5 5H11c-2.762 0-5-2.238-5-5V11c0-2.762 2.238-5 5-5h26c2.762 0 5 2.238 5 5v26z"/>
                <path fill="#FFF" d="M12 19h5v17h-5zm2.485-2h-.028C12.965 17 12 16.015 12 14.888 12 13.733 12.984 12 14.514 12c1.534 0 2.469 1.733 2.486 2.888 0 1.127-.952 2.112-2.485 2.112zM36 36h-5v-9.1c0-2.398-1.385-4.021-3.527-4.021-1.622 0-2.601 1.088-3.047 2.141-.164.407-.207.979-.207 1.555V36h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36z"/>
              </svg>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-2">
            <span className="text-xs text-gray-600">Already have an account? </span>
            <Link 
              to="/login" 
              className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center justify-center"
            >
              Sign In
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
