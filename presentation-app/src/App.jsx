import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import IntroSlide from './components/IntroSlide';
import ScheduleSlide from './components/ScheduleSlide';
import DocumentsSlide from './components/DocumentsSlide';
import ProgressSlide from './components/ProgressSlide';
import TravelFlowSlide from './components/TravelFlowSlide';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <IntroSlide />,
    <ScheduleSlide />,
    <TravelFlowSlide />,
    <DocumentsSlide />,
    <ProgressSlide />
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="app-container">
      <div className="main-content">
        {slides[currentSlide]}
      </div>

      <div className="controls">
        <button onClick={prevSlide} disabled={currentSlide === 0} className="nav-btn">
          <ChevronLeft />
        </button>
        <div className="slide-indicator">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
        <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="nav-btn">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default App;
