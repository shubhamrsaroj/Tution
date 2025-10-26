import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, 
  CheckCircle, 
  TrendingUp,
  Award,
  Users,
  Globe,
  Shield,
  Play,
  FileText,
  Youtube,
  Instagram,
  Send,
  Linkedin
} from 'lucide-react';
import SocialLinks from '../components/SocialLinks';
import PhotoCarousel from '../components/PhotoCarousel';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-indigo-600" />,
      title: "Comprehensive Study Material",
      description: "Access a wide range of study materials for various exams."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-green-600" />,
      title: "Practice Tests",
      description: "Take mock tests and assess your preparation level."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
      title: "Performance Analysis",
      description: "Get detailed insights into your exam preparation."
    }
  ];

  const examCategories = [
    {
      name: "Central Government Exams",
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      exams: ["UPSC", "SSC", "Railways"]
    },
    {
      name: "State Government Exams",
      icon: <Globe className="h-8 w-8 text-green-600" />,
      exams: ["State PSC", "State Police", "State Services"]
    },
    {
      name: "Banking & Insurance",
      icon: <Award className="h-8 w-8 text-blue-600" />,
      exams: ["IBPS", "SBI", "Insurance"]
    },
    {
      name: "Teaching Exams",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      exams: ["TET", "CTET", "NET"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <PhotoCarousel />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Exam Preparation</span>{' '}
              <span className="block text-indigo-200 xl:inline">Platform</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your comprehensive solution for exam preparation, offering personalized learning paths and expert guidance.
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
              <div className="rounded-md shadow">
                <button
                  onClick={() => navigate('/register')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Get Started
                  <Play className="ml-3 h-5 w-5" />
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  <FileText className="mr-3 h-5 w-5" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-sm text-indigo-200 mb-4">Connect with SmartIQ Academy</h4>
              <SocialLinks 
                variant="default" 
                className="justify-center text-white hover:text-indigo-100" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your Path to Exam Success
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exam Categories Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Exam Categories</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Prepare for Various Exams
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {examCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <div className="space-y-1">
                  {category.exams.map((exam, examIndex) => (
                    <p key={examIndex} className="text-sm text-gray-600">{exam}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Exam Preparation?
            </h2>
            <p className="mt-2 text-lg leading-6 text-indigo-200">
              Join thousands of successful candidates who have transformed their exam preparation.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate('/register')}
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white text-indigo-600 hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Connect with Smart IQ Academy</h2>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://youtube.com/@smartiqacademy-c8m?si=jMhu9r73ygOqbzsJ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-colors duration-300"
            >
              <Youtube className="h-12 w-12" />
            </a>
            <a 
              href="https://www.instagram.com/smartiq_academy?igsh=bnR1NnEwaWN3ZHZk&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 transition-colors duration-300"
            >
              <Instagram className="h-12 w-12" />
            </a>
            <a 
              href="https://t.me/SmartIQ_Academic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
            >
              <Send className="h-12 w-12" />
            </a>
            <a 
              href="https://www.linkedin.com/in/smartiq-academy-81a0a1385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-800 hover:text-blue-900 transition-colors duration-300"
            >
              <Linkedin className="h-12 w-12" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
