import { useState, useEffect } from 'react';

export const useTextRotator = (texts: string[], interval: number = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return texts[currentIndex];
};
