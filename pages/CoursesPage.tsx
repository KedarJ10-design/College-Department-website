import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { coursesData } from '../data/coursesData';

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