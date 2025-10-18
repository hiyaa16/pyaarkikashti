import React, { useState, useEffect } from "react";

function Typewriter({ text, speed = 30, inView = true }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!inView) {
      setDisplayed("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, inView]);

  return <span>{displayed}</span>;
}

export default Typewriter;
