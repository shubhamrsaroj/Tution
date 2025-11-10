import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // High-quality Unsplash images related to education and exam preparation
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Exam Preparation Study Materials",
      title: "Comprehensive Study Resources",
      description: "Access top-quality study materials for competitive exams"
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Mock Test Preparation",
      title: "Practice Mock Tests",
      description: "Enhance your exam readiness with comprehensive mock tests"
    },
    {
      src: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Current Affairs Study",
      title: "Stay Updated with Current Affairs",
      description: "Latest news and information to boost your exam preparation"
    },
    {
      src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Exam Preparation Classroom",
      title: "Expert Guided Learning",
      description: "Professional guidance for your exam success"
    },
    {
      src: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Banking and Competitive Exams",
      title: "Prepare for Competitive Exams",
      description: "Comprehensive preparation for banking and government exams"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % carouselImages.length
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide + 1) % carouselImages.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? carouselImages.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Carousel Images */}
      <div className="relative h-full w-full">
        {carouselImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image */}
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <h2 className="text-4xl font-bold mb-4">{image.title}</h2>
                <p className="text-xl">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 z-10"
      >
        <ChevronLeft className="text-gray-800" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 z-10"
      >
        <ChevronRight className="text-gray-800" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
