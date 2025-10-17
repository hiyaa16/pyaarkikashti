// Gallery.jsx
import bgImage from "./assets/bgw.jpg";

function Gallery() {
  return (
    // This is the single parent element that holds all content and the background
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
      {/* Content section (was the first separate div) */}
      <div style={{ padding: "2rem" }} className="relative z-10 text-white"> 
        <h2>Gallery</h2>
        <p>Gallery images.</p>
      </div>

      {/* The styling logic is now applied to the main container,
          so no need for the empty second div. */}
      {/* If you want an overlay to make text clearer: */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div> 

    </div>
  );
}

export default Gallery;