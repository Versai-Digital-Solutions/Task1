// components/FadeCarousel.jsx
import React, { useState, useEffect, useCallback } from 'react';

const FadeCarousel = ({ items, useColors = false, autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 500);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500);
  }, [items.length]);

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval]);

  return (
    <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-96 md:h-[500px]">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex 
                ? 'opacity-100' 
                : 'opacity-0 pointer-events-none'
            } ${isTransitioning ? 'transition-opacity duration-500' : ''}`}
          >
            {useColors ? (
              <div className={`w-full h-full ${item.color} flex items-center justify-center`}>
                <div className="text-white text-center">
                  <h3 className="text-4xl font-bold mb-4">{item.title}</h3>
                  <p className="text-xl">{item.description}</p>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-lg opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
        <button
          onClick={prevSlide}
          className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    
      <div className="p-4 bg-gray-50">
        <div className="flex justify-center space-x-3 overflow-x-auto py-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-blue-600 scale-110' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {useColors ? (
                <div className={`w-full h-full ${item.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        Auto-play
      </div>
    </div>
  );
};

export default FadeCarousel;