import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import OurStory from "./OurStory";
import Gallery from "./Gallery"; // single combined gallery component
import Itinerary from "./Itinerary";
import MusicPlayer from "./MusicPlayer";
import FAQSection from "./FAQSection";

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
        <Route path="/gallery" element={<Gallery />} /> {/* Use single Gallery.jsx */}
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/faq" element={<FAQSection />} />
      </Routes>
    </Router>
  );
}

export default App;
