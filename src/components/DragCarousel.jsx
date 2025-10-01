// components/DragCarousel.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';

const DragCarousel = ({ items, useColors = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!currentX) return;

    const diff = currentX - startX;
    setTranslateX(diff);
  }, [isDragging, startX]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const threshold = carouselRef.current.offsetWidth * 0.2;
    
    if (translateX < -threshold) {
      setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
    } else if (translateX > threshold) {
      setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
    }
    
    setIsDragging(false);
    setTranslateX(0);
  }, [isDragging, translateX, items.length]);

  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleTouchMove = (e) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const getTransform = () => {
    const baseTransform = -currentIndex * 100;
    const dragTransform = (translateX / carouselRef.current?.offsetWidth) * 100;
    return `translateX(calc(${baseTransform}% + ${dragTransform}px))`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div 
        ref={carouselRef}
        className="relative h-96 md:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div 
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ 
            transform: getTransform(),
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0 relative"
            >
              {useColors ? (
                <div className={`w-full h-full ${item.color} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <h3 className="text-4xl font-bold mb-4">{item.title}</h3>
                    <p className="text-xl">{item.description}</p>
                    <div className="mt-4 text-lg">
                      ← Drag or swipe to navigate →
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-lg opacity-90">
                        {item.description}
                      </p>
                      <div className="mt-4 text-sm opacity-75">
                        ← Drag or swipe to navigate →
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Slide {currentIndex + 1} of {items.length}</span>
          <div className="flex space-x-1">
            {items.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragCarousel;