import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const coursesData = [
  { id: 'CS101', title: 'Introduction to Programming', description: 'Fundamentals of programming using Python. Covers variables, control structures, functions, and basic data structures.' },
  { id: 'CS201', title: 'Data Structures and Algorithms', description: 'In-depth study of data structures like trees, graphs, and hash tables, along with fundamental algorithms for sorting, searching, and optimization.' },
  { id: 'CS301', title: 'Operating Systems', description: 'Principles of modern operating systems, including process management, memory management, file systems, and concurrency.' },
  { id: 'CS305', title: 'Database Management Systems', description: 'Design and implementation of database systems. Topics include SQL, relational algebra, and database normalization.' },
  { id: 'CS410', title: 'Artificial Intelligence', description: 'Introduction to the theory and practice of AI. Covers search, knowledge representation, machine learning, and natural language processing.' },
  { id: 'CS450', title: 'Computer Networks', description: 'A comprehensive look at network architecture and protocols, focusing on the layers of the Internet protocol suite.' },
];

const CourseItem: React.FC<{ course: typeof coursesData[0] }> = ({ course }) => {
    // FIX: Specified the element type as HTMLLIElement for the useIntersectionObserver hook to match the `li` element.
    const [ref, isVisible] = useIntersectionObserver<HTMLLIElement>({ threshold: 0.1 });

    return (
        <li ref={ref} className={`course-item fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <h3>{course.id}: {course.title}</h3>
            <p>{course.description}</p>
        </li>
    );
};

const CoursesPage: React.FC = () => {
  return (
    <div className="page-container">
      <h2>Our Courses</h2>
      <p>Explore the core curriculum and specialized electives offered by our department.</p>
      <ul className="courses-list">
        {coursesData.map(course => (
          <CourseItem key={course.id} course={course} />
        ))}
      </ul>
    </div>
  );
};

export default CoursesPage;
