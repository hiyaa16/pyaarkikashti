import React, { useEffect, useRef, useState } from "react";
import song from "./assets/music.mp3";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Start as paused, will change after interaction
  const [hasInteracted, setHasInteracted] = useState(false); // New state to track if user has moved mouse/tapped

  const playMusic = async () => {
    if (audioRef.current && !hasInteracted) {
      try {
        await audioRef.current.play();
        
        // Music started successfully:
        setIsPlaying(true);
        setHasInteracted(true);
        
        // IMPORTANT: Remove the event listener after the first successful interaction
        // Cleanup is handled by the useEffect return function below
        
      } catch (err) {
        // Play failed (Browser still blocking or other issue)
        console.log("Music play failed on interaction:", err);
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    // 1. Define the event handler
    const handleFirstInteraction = () => {
      // We only call playMusic here. If it succeeds, it sets hasInteracted to true,
      // and the cleanup function will run automatically.
      playMusic();
    };

    // 2. Add listeners for interaction
    window.addEventListener('mousemove', handleFirstInteraction);
    window.addEventListener('mousedown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction); // For mobile taps/scrolls

    // 3. Cleanup function: This runs when the component unmounts OR when the dependency array [hasInteracted] changes and hasInteracted is true.
    return () => {
      // This ensures listeners are removed after music starts
      window.removeEventListener('mousemove', handleFirstInteraction);
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]); // Re-run effect only when hasInteracted state changes

  const toggleMusic = () => {
    // If the user clicks the toggle button before any mouse/touch interaction, 
    // we should treat that click as the first interaction too.
    if (!hasInteracted) {
        playMusic(); 
        // If playMusic is successful, the state will update and the next block runs.
        return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Use .play() with catch to handle race conditions
      audioRef.current.play().catch(err => {
        console.log("Toggle play failed:", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Remove autoPlay attribute here */}
      <audio ref={audioRef} src={song} loop />

      {/* Floating icon bottom-right */}
      <button
        onClick={toggleMusic}
        // Tailwind classes for visibility and style
        className="fixed bottom-4 right-4 text-white text-2xl z-50 bg-gray-500 p-3 rounded-full shadow-xl cursor-pointer hover:scale-110 transition"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </>
  );
}

export default MusicPlayer;