import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const [isExamsDropdownOpen, setIsExamsDropdownOpen] = useState(false);
  const [isSamanyaGyanDropdownOpen, setIsSamanyaGyanDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleExamsDropdown = () => {
    setIsExamsDropdownOpen(!isExamsDropdownOpen);
    setIsSamanyaGyanDropdownOpen(false);
  };

  const toggleSamanyaGyanDropdown = () => {
    setIsSamanyaGyanDropdownOpen(!isSamanyaGyanDropdownOpen);
    setIsExamsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Capitalize first letter of name
  const capitalizeFirstLetter = (name) => {
    if (!name) return 'User';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Get full name from user object
  const getFullName = () => {
    if (!user) return 'User';
    const firstName = capitalizeFirstLetter(user.firstName || '');
    const lastName = capitalizeFirstLetter(user.lastName || '');
    return `${firstName} ${lastName}`.trim() || 'User';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-800">SmartIQ Academy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
            
            {/* Exams Dropdown */}
            <div className="relative group">
              <button 
                onClick={toggleExamsDropdown}
                className="text-gray-700 hover:text-blue-600 flex items-center font-medium transition-colors"
              >
                Exams
                <svg 
                  className={`ml-1 h-4 w-4 transform transition-transform ${isExamsDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isExamsDropdownOpen && (
                <div className="absolute left-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="py-1" role="menu">
                    <Link to="/exams/ssc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600" role="menuitem">SSC Exams</Link>
                    <Link to="/exams/banking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600" role="menuitem">Banking Exams</Link>
                    <Link to="/exams/railways" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600" role="menuitem">Railway Exams</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Samanva Gyan Guru Dropdown */}
            <div className="relative group">
              <button 
                onClick={toggleSamanyaGyanDropdown}
                className="text-gray-700 hover:text-blue-600 flex items-center font-medium transition-colors"
              >
                Samanva Gyan Guru
                <svg 
                  className={`ml-1 h-4 w-4 transform transition-transform ${isSamanyaGyanDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isSamanyaGyanDropdownOpen && (
                <div className="absolute left-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="py-1" role="menu">
                    <Link to="/gyan-guru/current-affairs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600" role="menuitem">Current Affairs</Link>
                    <Link to="/gyan-guru/general-knowledge" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600" role="menuitem">General Knowledge</Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/daily-quiz" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Daily Quiz</Link>
            <Link to="/live-test" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Live Test</Link>
            <Link to="/videos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Videos</Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Authentication State Rendering */}
              {!isAuthenticated ? (
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
                >
                  Login / Register
                </Link>
              ) : (
                <div className="relative group">
                  <button 
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {user?.firstName ? getFullName()[0] : 'U'}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm">
                        {getFullName()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user?.email || 'user@example.com'}
                      </span>
                    </div>
                    <svg 
                      className={`ml-1 h-4 w-4 transform transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="py-1" role="menu">
                        <Link 
                          to="/dashboard" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-2" 
                          role="menuitem"
                        >
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span>Dashboard</span>
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-2" 
                          role="menuitem"
                        >
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/exams" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Exams</Link>
            <Link to="/samanva-gyan-guru" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Samanva Gyan Guru</Link>
            <Link to="/daily-quiz" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Daily Quiz</Link>
            <Link to="/live-test" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Live Test</Link>
            <Link to="/videos" className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Videos</Link>
            
            {/* Mobile Authentication State Rendering */}
            {!isAuthenticated ? (
              <Link 
                to="/login" 
                className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium text-center mx-3"
              >
                Login / Register
              </Link>
            ) : (
              <>
                <div className="px-3 py-2 flex items-center space-x-3 bg-blue-50">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {user?.firstName ? getFullName()[0] : 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {getFullName()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
