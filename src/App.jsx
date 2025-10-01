// App.jsx
import React from 'react';
import ArrowCarousel from './components/ArrowCarousel';
import DragCarousel from './components/DragCarousel';
import FadeCarousel from './components/FadeCarousel';

// Working image URLs with different sources
const carouselData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Luxury Sports Car",
    description: "High-performance vehicle with sleek design"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Electric SUV", 
    description: "Eco-friendly and spacious family vehicle"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Classic Convertible",
    description: "Timeless design with modern features"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Modern Sedan",
    description: "Efficient and comfortable daily driver"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Adventure Off-roader",
    description: "Built for rugged terrain and exploration"
  }
];
const colorData = [
  {
    id: 1,
    color: "bg-gradient-to-r from-red-500 to-pink-500",
    title: "Luxury Sports Car",
    description: "High-performance vehicle with sleek design"
  },
  {
    id: 2,
    color: "bg-gradient-to-r from-blue-500 to-teal-500",
    title: "Electric SUV", 
    description: "Eco-friendly and spacious family vehicle"
  },
  {
    id: 3,
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    title: "Classic Convertible",
    description: "Timeless design with modern features"
  },
  {
    id: 4,
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    title: "Modern Sedan",
    description: "Efficient and comfortable daily driver"
  },
  {
    id: 5,
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    title: "Adventure Off-roader",
    description: "Built for rugged terrain and exploration"
  }
];

function App() {
  const [useColors, setUseColors] = React.useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Carousel Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three unique carousel components built with pure React and Tailwind CSS
          </p>
          
          {/* Toggle Button */}
          <div className="mt-6">
            <button
              onClick={() => setUseColors(!useColors)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {useColors ? "Show Images" : "Show Color Version"}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Current: {useColors ? "Color Version" : "Image Version"}
            </p>
          </div>
        </header>

        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              1. Arrow Navigation Carousel
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Features: Previous/Next arrows, pagination dots, and smooth sliding transitions
            </p>
            <ArrowCarousel items={useColors ? colorData : carouselData} useColors={useColors} />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              2. Drag & Swipe Carousel  
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Features: Mouse drag and touch swipe interactions with momentum
            </p>
            <DragCarousel items={useColors ? colorData : carouselData} useColors={useColors} />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              3. Fade Transition Carousel
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Features: Auto-play, fade transitions, and manual navigation
            </p>
            <FadeCarousel items={useColors ? colorData : carouselData} useColors={useColors} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;