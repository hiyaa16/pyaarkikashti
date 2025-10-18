import React, { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "./Typewriter"; // Import the Typewriter component

// Import images from assets folder
import collegeImg from "./assets/college.jpg";
import mcdonaldsImg from "./assets/mcdonalds.jpg";
import mountainsImg from "./assets/mountains.jpg";
import proposalImg from "./assets/proposal.jpg";
import foreverImg from "./assets/forever.jpg";

// Import background image
import backgroundImg from "./assets/bgw2.jpg";

const storySections = [
  {
    title: "College Days 🎓",
    image: collegeImg,
    text: "They met during their first year of college — two sectors apart but somehow side by side. What started as a casual introduction soon turned into endless laughter and friendship.",
  },
  {
    title: "The First Date 🍦",
    image: mcdonaldsImg,
    text: "Their first official date wasn’t fancy — just a McDonald’s brownie with ice cream. Simple, sweet, and unforgettable — the beginning of something real.",
  },
  {
    title: "Mountain Escapes ⛰️",
    image: mountainsImg,
    text: "She’s always been drawn to the mountains. Over the years, those peaceful drives became their special tradition — where time slowed and love felt effortless.",
  },
  {
    title: "The Proposal💍",
    image: proposalImg,
    text: "In a storybook twist, just three months after becoming close friends, he surprised her with a rain-soaked proposal — balloons bursting from the car, laughter echoing in the drizzle.",
  },
  {
    title: "Eight Years of Forever ❤️",
    image: foreverImg,
    text: "Eight years later, their journey is a celebration of friendship, adventure, and love found in the little everyday moments that make life beautiful.",
  },
];

function OurStory() {
  const [visibleIndexes, setVisibleIndexes] = useState(Array(storySections.length).fill(false));

  return (
    <div
      className="py-20 px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-4xl font-bold text-center mb-6 mt-6 text-white drop-shadow-lg">
        Our Story
      </h2>

      <p className="text-center mt-16 mb-16 italic font-bold text-white drop-shadow-md text-2xl">
        A little tale filled with laughter, love, and unforgettable moments — here’s how it all began...
      </p>

      <div className="flex flex-col items-center space-y-20">
        {storySections.map((section, index) => (
          <motion.div
            key={index}
            className="w-full max-w-4xl rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            onViewportEnter={() => {
              if (!visibleIndexes[index]) {
                const arr = [...visibleIndexes];
                arr[index] = true;
                setVisibleIndexes(arr);
              }
            }}
          >
            <div className="w-full h-[600px] overflow-hidden flex justify-center items-center mb-8">
              <img
                src={section.image}
                alt={section.title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-6 text-center rounded-lg mb-16">
              <h3 className="text-2xl font-semibold text-white mb-3">{section.title}</h3>
              <p className="text-2xl italic leading-relaxed">
                <Typewriter text={section.text} speed={30} inView={visibleIndexes[index]} />
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center mt-16 italic text-pink-600 drop-shadow-lg text-xl">
        “From that rainy day to this wedding day — their story continues with love and laughter.”
      </p>
    </div>
  );
}

export default OurStory;
