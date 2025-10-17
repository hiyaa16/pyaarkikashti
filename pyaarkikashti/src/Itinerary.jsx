import React, { useState, useEffect } from "react";
import bgImage from "./assets/bgw.jpg";
import carouselImage1 from "./assets/iti1.png";
import carouselImage2 from "./assets/iti2.png";
import carouselImage3 from "./assets/iti3.png";

const carouselImages = [
  { src: carouselImage1 },
  { src: carouselImage2 },
  { src: carouselImage3 },
];

// Tailwind's 'sm' breakpoint is 640px. Most phones are below this.
const SM_BREAKPOINT = 640; 

function Itinerary() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = carouselImages.length;
  
  // State to check if the screen is small (mobile/phone)
  const [isMobile, setIsMobile] = useState(window.innerWidth < SM_BREAKPOINT);

  // --- EFFECT HOOK TO DETECT SCREEN SIZE ---
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < SM_BREAKPOINT);
    };

    // Set initial value and listener
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  // --- CONDITIONAL CAROUSEL VARIABLES (Mobile vs. Laptop) ---
  // If isMobile is TRUE (iPhone/Samsung): Use wide card, no scaling, hidden sides.
  // If isMobile is FALSE (Laptop/Desktop): Use narrow card, scaling, visible sides.
  
  // NOTE: iPhone XR/Samsung Galaxy S phones will use the values below 640px.
  const CENTER_SCALE = isMobile ? 1.0 : 1.6; // 1.0 on phone (no large scaling needed)
  const SIDE_SCALE = isMobile ? 0.0 : 0.6;   // 0.0 on phone (hide side cards)
  const SIDE_OFFSET = isMobile ? 100 : 260; 
  const CARD_BASE_WIDTH = isMobile ? "85%" : "35%"; // Wide on phone (85%), narrow on laptop (35%)

  // ------------------------------------------

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const getRelativePosition = (index) => {
    let diff = index - currentSlide;
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;
    return diff;
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 text-white text-center w-full max-w-6xl px-2 sm:px-4 flex flex-col h-full">
        <h1
          className="mt-32 sm:mt-24 md:mt-24 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-lg leading-tight px-2"
          style={{ fontFamily: 'serif' }}
        >
          OUR WEDDING ITINERARY
        </h1>

        <div className="relative w-full mx-auto flex-grow flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] mt-10 sm:mt-16 md:mt-24">
          
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white z-30 transition hover:text-gray-300"
            aria-label="Previous Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 drop-shadow-lg"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white z-30 transition hover:text-gray-300"
            aria-label="Next Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 drop-shadow-lg"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {carouselImages.map((item, index) => {
            const position = getRelativePosition(index);
            const isCenter = position === 0;
            const isLeft = position === -1;
            const isRight = position === 1;

            let transformStyle = "";
            let zIndex = 5;
            let opacity = 0;
            
            const currentScale = isCenter ? CENTER_SCALE : SIDE_SCALE;
            const currentOffset = isCenter ? 0 : SIDE_OFFSET;

            if (isCenter) {
              transformStyle = `translateX(0%) scale(${CENTER_SCALE})`;
              zIndex = 20;
              opacity = 1;
            } else if (isLeft) {
              transformStyle = `translateX(-${currentOffset}%) scale(${currentScale})`;
              zIndex = 10;
              opacity = SIDE_SCALE > 0 ? 0.8 : 0; 
            } else if (isRight) {
              transformStyle = `translateX(${currentOffset}%) scale(${currentScale})`;
              zIndex = 10;
              opacity = SIDE_SCALE > 0 ? 0.8 : 0; 
            } else if (position < -1) {
              transformStyle = `translateX(-600%) scale(0.0)`; 
              opacity = 0;
              zIndex = 5;
            } else if (position > 1) {
              transformStyle = `translateX(600%) scale(0.0)`; 
              opacity = 0;
              zIndex = 5;
            }

            return (
              <div
                key={index}
                // Height adjustment: use h-[70%] for mobile, original classes for laptop/desktop
                className={`absolute ${isMobile ? 'h-[70%]' : 'h-[50%] sm:h-[65%] md:h-[80%]'} overflow-hidden cursor-pointer`}
                style={{
                  width: CARD_BASE_WIDTH,
                  zIndex,
                  transition: "all 800ms linear",
                  transform: `translateX(-50%) ${transformStyle}`,
                  opacity,
                  left: "50%",
                  backgroundColor: "transparent",
                }}
                onClick={() => setCurrentSlide(index)}
              >
                <img
                  src={item.src}
                  alt={`Itinerary Card ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center mb-6 mt-4 space-x-1 sm:space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Itinerary;