import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Send, 
  Linkedin 
} from 'lucide-react';

const SocialLinks = ({ 
  variant = 'default', 
  className = '' 
}) => {
  const socialLinks = [
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com/@smartiqacademy-c8m?si=jMhu9r73ygOqbzsJ',
      color: {
        default: 'text-red-600 hover:text-red-700',
        white: 'text-white hover:text-indigo-100'
      }
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/smartiq_academy?igsh=bnR1NnEwaWN3ZHZk&utm_source=qr',
      color: {
        default: 'text-pink-600 hover:text-pink-700',
        white: 'text-white hover:text-indigo-100'
      }
    },
    {
      name: 'Telegram',
      icon: Send,
      href: 'https://t.me/SmartIQ_Academic',
      color: {
        default: 'text-blue-600 hover:text-blue-700',
        white: 'text-white hover:text-indigo-100'
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/smartiq-academy-81a0a1385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      color: {
        default: 'text-blue-800 hover:text-blue-900',
        white: 'text-white hover:text-indigo-100'
      }
    }
  ];

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a 
            key={link.name}
            href={link.href}
            target="_blank" 
            rel="noopener noreferrer"
            className={`transition-colors duration-300 ${link.color[variant]}`}
            aria-label={`${link.name} Link`}
          >
            <Icon className="h-6 w-6" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
