import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import RSVPSection from "./RSVPSection";
import OurStory from "./OurStory";
import Gallery from "./Gallery";
import Itinerary from "./Itinerary";
import MusicPlayer from "./MusicPlayer";
import FAQSection from "./FAQSection";
import RSVPTable from "./RSVPTable"; // RSVP Data Table (Admin View)
import CloudinaryUpload from "./CloudinaryUpload"; // Optional upload route
import ProtectedRoute from "./ProtectedRoute"; // add this import
import OutfitMoodboard from "./OutfitMoodboard";


function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <RSVPSection /> {/* RSVP Form Section */}
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
        <Route path="/rsvp-table" element={<ProtectedRoute><RSVPTable /></ProtectedRoute>} />
        <Route path="/upload" element={<CloudinaryUpload />} /> {/* Optional Route */}
        <Route path="/outfitMoodboard" element={<OutfitMoodboard />} />
      </Routes>
    </Router>
  );
}

export default App;
