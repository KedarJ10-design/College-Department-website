import React from 'react';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    // FIX: Specified the element type as HTMLDivElement for the useIntersectionObserver hook to match the `div` element.
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
    return (
        <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className || ''}`}>
            {children}
        </div>
    );
};


const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Section className="hero-section">
        <div className="hero-content">
          <h2>Welcome to the Computer Science Department</h2>
          <p>Innovating the future, one line of code at a time.</p>
          <Link to="/courses" className="cta-button">Explore Our Courses</Link>
        </div>
      </Section>

      <Section>
        <h3>About Us</h3>
        <p>Our department is at the forefront of computer science education and research. We are committed to providing a dynamic learning environment that fosters innovation, critical thinking, and a passion for technology. Our curriculum is designed to equip students with the knowledge and skills needed to excel in the ever-evolving tech industry.</p>
      </Section>

      <Section>
        <h3>Our Mission</h3>
        <p>To advance the field of computer science through cutting-edge research, to provide a world-class education that prepares students for leadership roles, and to leverage technology to solve real-world problems and make a positive impact on society.</p>
      </Section>
    </div>
  );
};

export default HomePage;