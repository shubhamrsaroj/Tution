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
  Linkedin,
  Target,
  Rocket,
  Clock
} from 'lucide-react';
import SocialLinks from '../components/SocialLinks';
import PhotoCarousel from '../components/PhotoCarousel';

const HomePage = () => {
  const navigate = useNavigate();

  const keyFeatures = [
    {
      icon: <Target className="h-12 w-12 text-indigo-600" />,
      title: "Targeted Preparation",
      description: "Personalized learning paths for your specific exam goals",
      color: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-100"
    },
    {
      icon: <Rocket className="h-12 w-12 text-green-600" />,
      title: "Comprehensive Coverage",
      description: "Extensive study materials across 150+ competitive exams",
      color: "bg-green-50",
      hoverColor: "hover:bg-green-100"
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "Adaptive Learning",
      description: "Smart technology that adapts to your learning pace",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    }
  ];

  const examCategories = [
    {
      name: "Government Exams",
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      exams: ["UPSC", "SSC", "Railways"],
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Banking Exams",
      icon: <Award className="h-8 w-8 text-blue-600" />,
      exams: ["IBPS", "SBI", "RBI"],
      image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Teaching Exams",
      icon: <Users className="h-8 w-8 text-green-600" />,
      exams: ["TET", "CTET", "NET"],
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "State Level Exams",
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      exams: ["State PSC", "Police", "Revenue"],
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PhotoCarousel />
      
      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose SmartIQ Academy?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Empowering your exam preparation with cutting-edge learning solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl shadow-lg text-center transition-all duration-300 ${feature.color} ${feature.hoverColor}`}
              >
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Categories Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Exam Categories
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive preparation for diverse competitive exams
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {examCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-1 mb-4">
                    {category.exams.map((exam, examIndex) => (
                      <p key={examIndex} className="text-sm text-gray-600">
                        {exam}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Start Your Exam Preparation Journey Today
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Join thousands of successful candidates who have transformed their exam preparation
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-indigo-700 px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-50 transition duration-300 flex items-center"
            >
              Create Free Account
              <Play className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-600 transition duration-300 flex items-center"
            >
              Login
              <FileText className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Connect with SmartIQ Academy
          </h2>
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
      </section>
    </div>
  );
};

export default HomePage;
