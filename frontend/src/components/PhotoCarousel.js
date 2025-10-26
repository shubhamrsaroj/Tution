import React, { useState, useEffect } from 'react';

const carouselItems = [
  {
    id: 1,
    title: 'Prepare for 150+ Exams',
    description: 'Select your exams today and let us help you in your preparations for SSC, IBPS, Banking, Railways, Defense, TET, Lekhpal, Patwari, CCC, NEET, UPSC, Airforce, Navy and many more',
    buttonText: 'Start Preparation Today',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
  },
  {
    id: 2,
    title: 'Daily Current Affairs',
    description: 'Stay updated with the latest current affairs and general knowledge to boost your exam preparation',
    buttonText: 'Read Latest News',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
  },
  {
    id: 3,
    title: 'Mock Tests & Practice',
    description: 'Take unlimited mock tests, solve previous year question papers, and track your progress',
    buttonText: 'Start Mock Test',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
  }
];

const PhotoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);

  const currentItem = carouselItems[currentSlide];

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center container mx-auto px-4 z-10">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {currentItem.title}
          </h1>
          <p className="text-gray-700 text-lg">
            {currentItem.description}
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
            {currentItem.buttonText}
          </button>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
        <img 
          src={currentItem.image} 
          alt={currentItem.title} 
          className="object-contain h-full w-full bg-blue-200"
        />
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 z-20"
      >
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 z-20"
      >
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
