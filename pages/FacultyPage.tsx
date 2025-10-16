import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const facultyData = [
  { id: 1, name: 'Dr. Evelyn Reed', title: 'Department Chair, Professor', expertise: 'Artificial Intelligence, Machine Learning', image: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Dr. Samuel Chen', title: 'Professor', expertise: 'Cybersecurity, Network Protocols', image: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Dr. Maria Garcia', title: 'Associate Professor', expertise: 'Data Science, Big Data Analytics', image: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Dr. Ben Carter', title: 'Associate Professor', expertise: 'Software Engineering, Agile Methodologies', image: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Dr. Olivia Martinez', title: 'Assistant Professor', expertise: 'Human-Computer Interaction, UX Design', image: 'https://i.pravatar.cc/150?img=5' },
  { id: 6, name: 'Dr. James Lee', title: 'Assistant Professor', expertise: 'Computer Graphics, Virtual Reality', image: 'https://i.pravatar.cc/150?img=6' },
];

const FacultyCard: React.FC<{ faculty: typeof facultyData[0] }> = ({ faculty }) => {
    // FIX: Specified the element type as HTMLDivElement for the useIntersectionObserver hook to match the `div` element.
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

    return (
        <div ref={ref} className={`faculty-card fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <img src={faculty.image} alt={`Portrait of ${faculty.name}`} className="faculty-image" />
            <div className="faculty-info">
                <h4>{faculty.name}</h4>
                <p><em>{faculty.title}</em></p>
                <p><strong>Expertise:</strong> {faculty.expertise}</p>
            </div>
        </div>
    );
};

const FacultyPage: React.FC = () => {
  return (
    <div className="page-container">
      <h2>Our Faculty</h2>
      <p>Meet the dedicated educators and researchers who form the backbone of our department.</p>
      <div className="faculty-grid">
        {facultyData.map(faculty => (
          <FacultyCard key={faculty.id} faculty={faculty} />
        ))}
      </div>
    </div>
  );
};

export default FacultyPage;