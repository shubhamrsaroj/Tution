import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  Target, 
  Clock, 
  LogOut, 
  User, 
  Settings, 
  BarChart2, 
  FileText,
  Award,
  Calendar,
  Globe,
  Shield,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';  // Import the new Logo component
import QuickTools from '../components/QuickTools';
import SocialLinks from '../components/SocialLinks';  // Import the new SocialLinks component
import OfflineTutionPhotos from '../components/OfflineTutionPhotos.js';  // Import the new OfflineTutionPhotos component

// Dummy Exam Data
const DUMMY_EXAMS = [
  {
    id: 1,
    name: "UPSC Prelims 2025",
    subject: "General Studies",
    date: "15 June 2025",
    status: "Upcoming",
    progress: 75,
    difficulty: "Hard"
  },
  {
    id: 2,
    name: "SSC CGL Tier 1",
    subject: "Quantitative Aptitude",
    date: "22 July 2025",
    status: "Preparing",
    progress: 60,
    difficulty: "Medium"
  },
  {
    id: 3,
    name: "Banking Exam",
    subject: "Reasoning",
    date: "5 August 2025",
    status: "Not Started",
    progress: 20,
    difficulty: "Easy"
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

const DashboardCard = ({ icon, title, value, bgColor, textColor }) => (
  <div className={`p-6 rounded-xl shadow-md flex items-center space-x-4 ${bgColor}`}>
    <div className={`p-3 rounded-full ${textColor} bg-opacity-20`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const ExamProgressCard = ({ exam }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Upcoming': return 'text-blue-600 bg-blue-50';
      case 'Preparing': return 'text-yellow-600 bg-yellow-50';
      case 'Not Started': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{exam.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
          {exam.status}
        </span>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <Calendar className="h-5 w-5 text-gray-400" />
        <span className="text-gray-600">{exam.date}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-4">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${exam.progress}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-600">{exam.progress}%</span>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">Subject: {exam.subject}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          exam.difficulty === 'Hard' ? 'text-red-600 bg-red-50' :
          exam.difficulty === 'Medium' ? 'text-yellow-600 bg-yellow-50' :
          'text-green-600 bg-green-50'
        }`}>
          {exam.difficulty}
        </span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();

  
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  // Detailed debug logging
  useEffect(() => {
    console.group('Dashboard Component Debug');
    console.log('User Object:', user);
    console.log('Is Authenticated:', isAuthenticated);
    console.log('User Type:', typeof user);
    console.log('User Keys:', user ? Object.keys(user) : 'No user object');
    
    // Check local storage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    console.log('Stored User:', storedUser);
    console.log('Stored Token:', storedToken ? 'Token exists' : 'No token');

    console.log('User Username:', user?.username);
    console.log('User Email:', user?.email);
    
    // Detailed authentication check
    if (!isAuthenticated) {
      console.warn('User is not authenticated');
      navigate('/login');
    } else if (!user) {
      console.warn('User object is null or undefined');
      navigate('/login');
    }
    
    console.groupEnd();
  }, [user, isAuthenticated, navigate]);

  // Render loading state if user is not fully loaded
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <Logo size="large" className="mb-4" />
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Exams Attempted",
      value: "12",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Performance",
      value: "85%",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal Progress",
      value: "65%",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Study Time",
      value: "24h",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  const sidebarItems = [
    { 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: "Overview", 
      section: "overview" 
    },
    { 
      icon: <BarChart2 className="h-5 w-5" />, 
      label: "Performance", 
      section: "performance" 
    },
    { 
      icon: <FileText className="h-5 w-5" />, 
      label: "Exams", 
      section: "exams" 
    },
    { 
      icon: <User className="h-5 w-5" />, 
      label: "Profile", 
      section: "profile" 
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: "Settings", 
      section: "settings" 
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-6 flex flex-col">
        <div className="flex items-center space-x-4 mb-10">
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user && user?.username ? user?.user.username : 'User'}</h2>
            <p className="text-sm text-gray-500">{user?.user.email}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.section}
              onClick={() => setActiveSection(item.section)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                activeSection === item.section 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
            
          </button>

         
        </nav>

        {/* Social Links Section */}
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-4 text-center">Connect with SmartIQ</h4>
          <SocialLinks 
            variant="default" 
            className="justify-center" 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="grid grid-cols-4 gap-6 mb-10">
          {dashboardStats.map((stat, index) => (
            <DashboardCard key={index} {...stat} />
          ))}
        </div>

        {/* Placeholder for different sections */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {activeSection === 'overview' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome, {user?.username}!</h2>
                <p className="text-gray-600 mb-6">Here's an overview of your exam preparation journey.</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Exam Categories */}
                <div className="col-span-2">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Exam Categories</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {examCategories.map((category, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4 hover:bg-gray-100 transition"
                      >
                        {category.icon}
                        <div>
                          <h4 className="font-medium text-gray-800">{category.name}</h4>
                          <p className="text-sm text-gray-600">{category.exams.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Tools */}
                <div>
                  <QuickTools />
                </div>
              </div>

              {/* Upcoming Exams */}
              <div className="mt-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Upcoming Exams</h3>
                  <button 
                    onClick={() => setActiveSection('exams')}
                    className="text-indigo-600 hover:text-indigo-800 transition"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {DUMMY_EXAMS.slice(0, 3).map((exam) => (
                    <ExamProgressCard key={exam.id} exam={exam} />
                  ))}
                </div>
              </div>

              {/* Add Offline Tution Photos section */}
              <OfflineTutionPhotos />
            </div>
          )}
          
          {activeSection === 'exams' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Exams</h2>
                <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
                  <FileText className="h-5 w-5" />
                  <span>Add New Exam</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {DUMMY_EXAMS.map((exam) => (
                  <ExamProgressCard key={exam.id} exam={exam} />
                ))}
              </div>
            </div>
          )}

          {activeSection === 'performance' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Analysis</h2>
              {/* Add performance charts or details */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
