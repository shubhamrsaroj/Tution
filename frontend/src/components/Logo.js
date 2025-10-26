import React, { useState } from 'react';
import logoImage from '../Images/logo.png';

const Logo = ({ 
  size = 'medium', 
  className = '', 
  showText = true
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
    xlarge: 'w-48 h-48'
  };

  const handleImageError = () => {
    setImageError(true);
    console.error('Logo image failed to load');
  };

  // Fallback SVG logo if image fails to load
  const FallbackLogo = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={`${sizeClasses[size]} text-blue-600`}
    >
      <rect width="100" height="100" fill="currentColor" rx="10" />
      <text 
        x="50" 
        y="60" 
        textAnchor="middle" 
        fill="white" 
        fontSize="40" 
        fontWeight="bold"
      >
        IQ
      </text>
    </svg>
  );

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-2">
        {imageError ? (
          <FallbackLogo />
        ) : (
          <img 
            src={logoImage} 
            alt="SmartIQ Academy Logo" 
            className={`object-contain ${sizeClasses[size]} rounded-full`} 
            onError={handleImageError}
          />
        )}
        
        {showText && (
          <div className="flex flex-col">
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
