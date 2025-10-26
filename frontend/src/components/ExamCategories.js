import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Shield, 
  Globe, 
  Award, 
  Users, 
  Book, 
  Target 
} from 'lucide-react';

const ExamCategoryIcons = {
  'Board Exams': <BookOpen className="h-8 w-8 text-blue-600" />,
  'Engineering & Pharmacy Entrance': <Target className="h-8 w-8 text-green-600" />,
  'Law Entrance': <Book className="h-8 w-8 text-purple-600" />,
  'Defence Exams': <Shield className="h-8 w-8 text-red-600" />,
  'Government Job Exams': <Users className="h-8 w-8 text-indigo-600" />,
  'Banking & RBI Exams': <Award className="h-8 w-8 text-yellow-600" />,
  'MBA & Management': <Globe className="h-8 w-8 text-teal-600" />,
  'Maritime Exams': <BookOpen className="h-8 w-8 text-orange-600" />
};

const ExamCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedExamMode, setSelectedExamMode] = useState('');

  useEffect(() => {
    const fetchExamCategories = async () => {
      try {
        let url = '/api/exam-categories/search';
        const params = {};

        if (searchQuery) params.query = searchQuery;
        if (selectedLevel) params.level = selectedLevel;
        if (selectedExamMode) params.examMode = selectedExamMode;

        const response = await axios.get(url, { params });
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch exam categories');
        setLoading(false);
      }
    };

    fetchExamCategories();
  }, [searchQuery, selectedLevel, selectedExamMode]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
          Exam Categories
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Explore comprehensive exam preparation resources across various categories
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex justify-center space-x-4">
        <div className="relative w-1/2">
          <input 
            type="text" 
            placeholder="Search exam categories..." 
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select 
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Levels</option>
          <option value="National">National</option>
          <option value="State">State</option>
          <option value="Entrance">Entrance</option>
        </select>

        <select 
          value={selectedExamMode}
          onChange={(e) => setSelectedExamMode(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Exam Modes</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category._id} 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <div className="flex items-center mb-4">
              {ExamCategoryIcons[category.name] || <BookOpen className="h-8 w-8 text-gray-600" />}
              <h3 className="ml-4 text-xl font-semibold text-gray-800">{category.name}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">{category.description}</p>
            
            <div className="space-y-2">
              {category.subcategories && category.subcategories.map((subcategory, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <h4 className="font-medium text-gray-700">{subcategory.name}</h4>
                  <div className="text-sm text-gray-500 mt-1">
                    <p><strong>Eligibility:</strong> {subcategory.eligibility}</p>
                    <p><strong>Exam Mode:</strong> {subcategory.examMode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No exam categories found. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
};

export default ExamCategories;
