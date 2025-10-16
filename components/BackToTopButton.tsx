import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Shows the button when the page is scrolled down more than 300px.
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Sets up a listener for the scroll event.
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleans up the listener when the component unmounts.
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scrolls the window to the top smoothly.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`back-to-top-button ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Go to top"
      title="Go to top"
    >
      ↑
    </button>
  );
};

export default BackToTopButton;
