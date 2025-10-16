import React from 'react';
import AchievementsCarousel from '../components/AchievementsCarousel';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const recentAchievements = [
  'John Doe - 1st Place at ACM ICPC Regional Contest',
  'Jane Smith - Published paper on Quantum Computing in "Nature"',
  'CS Department - Awarded "Center of Excellence" by the National Board of Education',
  'Student Team "CodeCrafters" - Won the International Rover Challenge',
];

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // FIX: Specified the element type as HTMLLIElement for the useIntersectionObserver hook to match the `li` element.
    const [ref, isVisible] = useIntersectionObserver<HTMLLIElement>({ threshold: 0.5 });
    return <li ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>{children}</li>;
};

const AchievementsPage: React.FC = () => {
  return (
    <div className="page-container">
      <h2>Our Achievements</h2>
      <p>We are proud of the accomplishments of our students, faculty, and alumni.</p>

      <AchievementsCarousel />

      <div className="recent-achievements-list">
        <h3>Recent Highlights</h3>
        <ul>
            {recentAchievements.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AchievementsPage;
