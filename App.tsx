import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FacultyPage from './pages/FacultyPage';
import CoursesPage from './pages/CoursesPage';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import BackToTopButton from './components/BackToTopButton';
import Preloader from './components/Preloader';
import AICourseAdvisor from './components/AICourseAdvisor';
import './styles.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <HashRouter>
      <div className={`app-container ${loading ? 'is-loading' : ''}`}>
        <Preloader loading={loading} />
        {!loading && (
          <>
            <Header />
            <main className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/faculty" element={<FacultyPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
            <BackToTopButton />
            <AICourseAdvisor />
          </>
        )}
      </div>
    </HashRouter>
  );
};

export default App;