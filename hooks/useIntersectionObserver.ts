import { useEffect, useRef, useState } from 'react';

// FIX: Made the hook generic to accept any element type that extends Element.
const useIntersectionObserver = <T extends Element>(
  options: IntersectionObserverInit
): [React.RefObject<T>, boolean] => {
  const containerRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default useIntersectionObserver;
