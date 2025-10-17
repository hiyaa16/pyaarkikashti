import React, { useState } from "react";
import storyImg from "./assets/image6.jpg"; // Your main story image
import image7 from "./assets/image3.jpg"; // UNCOMMENTED
import image8 from "./assets/image.jpg"; // UNCOMMENTED
import image9 from "./assets/image9.jpg"; // UNCOMMENTED
import bgImage from "./assets/bgw.jpg"; // <-- 1. IMPORT YOUR BACKGROUND IMAGE HERE!

// NOTE: I've uncommented your image imports so the code runs without errors.
// Replace these with your actual photo imports or URLs
const photos = [image7, image8, image9];

function OurStory() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation handlers for photo carousel on small screens
  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    // 2. APPLY BACKGROUND IMAGE AND STYLES TO THE OUTER DIV
    <div
      className="min-h-screen flex flex-col items-center justify-center py-4 relative"
      style={{
        // Set the background image
        backgroundImage: `url(${bgImage})`,
        // Make the background cover the entire element
        backgroundSize: 'cover',
        // Fix the background so it doesn't scroll with content
        backgroundAttachment: 'fixed', 
        // Center the background image
        backgroundPosition: 'center', 
        // If you still want a slight background color overlay (optional)
        backgroundColor: '#f4f4f4',
      }}
    >
        

        {/* 4. WRAP ALL CONTENT IN A Z-INDEXED DIV TO BE ON TOP OF THE OVERLAY */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
            
            <h1
              style={{ fontFamily: "'Bodoni Moda', serif" }}
              className="text-center text-2xl sm:text-2xl md:text-5xl mt-24 font-thin tracking-normal"
            >
              How it all began
            </h1>

            <img
              src={storyImg}
              alt="Our Story"
              className="w-full mt-14 px-10 md:max-w-7xl sm:max-w-sm"
            />

            {/* Quotes Section - Make sure text is dark/clear */}
            <div className="w-full flex flex-col gap-16 mt-12 px-4 sm:px-6 lg:px-24">
              {/* NOTE: I noticed you had two identical quote blocks. I'll keep them as is. */}
              <blockquote
                className="max-w-2xl text-left text-lg md:text-2xl font-normal md:mt-10 md:ml-24 text-black"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                “I saw her across the bar and I couldn’t look away until I had the guts to talk to her.”
                <footer>
                  <span className="block mt-4 text-s text-gray-600">— Karan</span>
                </footer>
              </blockquote>

              <blockquote
                className="max-w-3xl mx-auto text-center text-lg md:text-2xl font-normal md:mr-24 text-black"
                style={{ textAlign: "left", fontFamily: "'Bodoni Moda', serif" }}
              >
                “We caught eye contact at one point and I was mesmerized by that addicting smile of his.”
                <footer>
                  <span className="block mt-4 text-s text-gray-600 text-left ">
                    — Shrishti
                  </span>
                </footer>
              </blockquote>
            </div>
            <div className="w-full flex flex-col gap-16 mt-12 px-4 sm:px-6 lg:px-24">
              <blockquote
                className="max-w-2xl text-left text-lg md:text-2xl font-normal md:mt-20 md:ml-24 text-black"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                “I saw her across the bar and I couldn’t look away until I had the guts to talk to her.”
                <footer>
                  <span className="block mt-4 text-s text-gray-600">— Karan</span>
                </footer>
              </blockquote>

              <blockquote
                className="max-w-3xl mx-auto text-center text-lg md:text-2xl font-normal md:mr-24 text-black"
                style={{ textAlign: "left", fontFamily: "'Bodoni Moda', serif" }}
              >
                “We caught eye contact at one point and I was mesmerized by that addicting smile of his.”
                <footer>
                  <span className="block mt-4 text-s text-gray-600 text-left ">
                    — Shrishti
                  </span>
                </footer>
              </blockquote>
            </div>

            {/* Photos Carousel Section */}
            <div className="w-full mt-12 px-4 sm:px-6 lg:px-24">
              {/* Navigation arrows for small screens */}
              <div className="flex items-center justify-between mb-4 sm:hidden">
                <button
                  onClick={prevPhoto}
                  aria-label="Previous photo"
                  className="px-3 py-1 border rounded bg-white text-black" // Added styling for visibility
                >
                  &lt;
                </button>
                <button
                  onClick={nextPhoto}
                  aria-label="Next photo"
                  className="px-3 py-1 border rounded bg-white text-black" // Added styling for visibility
                >
                  &gt;
                </button>
              </div>

              {/* Show 3 photos side-by-side on medium and larger screens */}
              <div className="hidden sm:flex flex-wrap justify-center gap-6">
                {photos.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Photo ${idx + 1}`}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain rounded-md md:m-4 md:mt-48 shadow-lg" // Added shadow for effect
                  />
                ))}
              </div>

              {/* Show single photo on small screens with carousel */}
              <div className="sm:hidden flex justify-center">
                <img
                  src={photos[currentIndex]}
                  alt={`Photo ${currentIndex + 1}`}
                  className="w-64 border border-gray-300 rounded-md shadow-lg" // Added shadow for effect
                />
              </div>
            </div>
        </div>
    </div>
  );
}

export default OurStory;