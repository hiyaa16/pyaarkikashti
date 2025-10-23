import React, { useState } from "react";
// 1. ✅ Import your background image here
import faqBg from "./assets/bgw.jpg"; // <--- Make sure this path is correct

const faqData = [
  {
    question: "Are accommodations provided for the wedding?",
    answer:
      "Yes! All guests will have accommodations booked at the venue for two nights — 22nd and 23rd November.",
  },
  {
    question: "When should I arrive at the venue?",
    answer:
      "Guests should plan to arrive by the november 22nd to settle in before the afternoon's festivities.",
  },
  {
    question: "Is transportation provided to and from the airport?",
    answer:
      "Yes, we are arranging transportation for all guests. Please share your flight details via the form present in this site.",
  },
  {
    question: "Do you need my flight information?",
    answer:
      "Yes! We have send out a form in this website to collect everyone’s travel details. This will help us coordinate your arrivals and ensure all necessary information is provided for a smooth experience.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Yes! We do have a dress code . Don’t worry, ideas for outfits are right here on the website that will help you pick the perfect outfit for the celebration!",
  },
  {
    question: "what essentials should i carry for wedding?",
    answer:
      "For day functions carry sunglasses,cap and sunscreen , pair of comfortable shoes for dune's function, and warm clothes/cover-ups for the chilly nights.",
  },
  {
    question: "what will be the weather conditions in november?",
    answer:
      "Most likely at day it will be 30°C and at night it can go down to 10°C. Please pack accordingly.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => setOpenIndex(idx === openIndex ? null : idx);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        // ✅ 2. Background image applied here
        backgroundImage: `url(${faqBg})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Optional: Makes background fixed on scroll
        position: "relative", // Changed from 'absolute' to 'relative' if this is a standalone section
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0", // Added padding for better spacing on small screens
      }}
    >
      {/* ✅ 3. Overlay for readability */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.8, // Adjust opacity as needed
          zIndex: 1, // Ensure overlay is behind content but above background
        }}
      />

      <h2
        style={{
          color: "white",
          fontFamily: "inherit",
          marginBottom: 32,
          marginTop: 40,
          textAlign: "center",
          position: "relative", // Ensure text is above the overlay
          zIndex: 2,
          fontSize: "2.5rem", // Larger font for heading
          padding: "0 10px", // Added padding for mobile
        }}
      >
        Frequently Asked Questions
      </h2>
      <div 
        style={{ 
          width: "90%", // Increased width for better mobile display
          maxWidth: 900, 
          position: "relative", 
          zIndex: 2,
          paddingBottom: "40px" // Added space at the bottom for content
        }}
      >
        {faqData.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#7a7474ff",
              borderRadius: 12,
              marginBottom: 16,
              boxShadow: "0 1px 8px rgba(0,0,0,0.3)", // Corrected boxShadow syntax
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => handleToggle(idx)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "white",
                fontWeight: 700,
                fontSize: "1.25rem", // Adjusted font size for responsiveness
                padding: "22px 24px",
                borderRadius: 12,
                textAlign: "left",
                cursor: "pointer",
                outline: "none",
                display: "flex", // To align arrow
                justifyContent: "space-between", // To push arrow to end
                alignItems: "center",
              }}
            >
              {item.question}
              <span 
                style={{ 
                  fontSize: "1.5rem", 
                  transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)", 
                  transition: "transform 0.3s ease",
                  marginLeft: "10px" // Space between text and arrow
                }}
              >
                &#9660; {/* Down arrow character */}
              </span>
            </button>
            {openIndex === idx && (
              <div
                style={{
                  color: "#f3f1f1ff",
                  fontSize: "1.1rem", // Adjusted font size
                  padding: "0 28px 18px 28px",
                  fontFamily: "inherit",
                  animation: "fadeIn 0.3s forwards", // Added forwards to keep final state
                }}
              >
                {item.answer || (
                  <span style={{ color: "#7a7979ff" }}>Answer coming soon.</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
       {/* Global fadeIn animation (can be moved to a CSS file) */}
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default FAQSection;