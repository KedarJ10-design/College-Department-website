import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const achievements = [
  {
    id: 1,
    title: 'Winner of the National Coding Olympiad 2024',
    description: 'Our team of four students secured the first place, showcasing their exceptional problem-solving and coding skills.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Published Research in "Journal of AI"',
    description: 'Prof. Evelyn Reed and her graduate students published a groundbreaking paper on novel neural network architectures.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Best Student Project Award at TechFest 2024',
    description: 'A final-year project on assistive technology for the visually impaired won the top prize for its innovation and social impact.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
  },
];

const AchievementsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // FIX: Specified the element type as HTMLDivElement for the useIntersectionObserver hook to match the `div` element.
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });


  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isVisible]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div ref={ref} className={`achievements-carousel fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {achievements.map((achievement) => (
          <div className="carousel-item" key={achievement.id}>
            <img src={achievement.image} alt={achievement.title} />
            <div className="carousel-caption">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {achievements.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AchievementsCarousel;