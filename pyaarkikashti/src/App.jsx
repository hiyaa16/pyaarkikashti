import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import OurStory from "./OurStory";
import Gallery from "./Gallery";
import Itinerary from "./Itinerary";
import MusicPlayer from "./MusicPlayer";
import FAQSection from "./FAQSection";
import CloudinaryUpload from "./CloudinaryUpload"; // <-- Import here

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeroSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <MusicPlayer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/upload" element={<CloudinaryUpload />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
