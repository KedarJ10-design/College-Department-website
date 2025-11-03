import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const newsData = [
    {
        id: 1,
        title: 'Department Awarded Grant for AI Research',
        date: 'October 26, 2024',
        category: 'Research',
        excerpt: 'The National Science Foundation has awarded our department a $1.5 million grant to further our research in ethical AI and machine learning models.',
        image: 'https://images.unsplash.com/photo-1620712943543-2858200e9456?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Annual Hackathon "CodeFest 2024" Announced',
        date: 'October 22, 2024',
        category: 'Event',
        excerpt: 'Join us for our annual 24-hour hackathon on November 15-16. This year\'s theme is "Tech for Good". Prizes and internship opportunities await!',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'New Cybersecurity Lab Opens',
        date: 'October 18, 2024',
        category: 'Announcement',
        excerpt: 'We are thrilled to unveil our new state-of-the-art cybersecurity lab, equipped with the latest tools to provide students with hands-on experience.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Prof. Samuel Chen to Speak at Global Tech Summit',
        date: 'October 15, 2024',
        category: 'Event',
        excerpt: 'Our very own Dr. Samuel Chen will be a keynote speaker at the Global Tech Summit in San Francisco, discussing the future of network security.',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
    },
];


const NewsCard: React.FC<{ item: typeof newsData[0] }> = ({ item }) => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
    return (
        <div ref={ref} className={`news-card fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <img src={item.image} alt={item.title} className="news-card-image" />
            <div className="news-card-content">
                <div className="news-card-header">
                    <span>{item.date}</span>
                    <span className={`news-card-tag ${item.category.toLowerCase()}`}>{item.category}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <a href="#read-more">Read More →</a>
            </div>
        </div>
    );
};


const NewsPage: React.FC = () => {
    return (
        <div className="page-container">
            <h2>News & Events</h2>
            <p>Stay up-to-date with the latest news, announcements, and events from the CS Department.</p>
            <div className="news-grid">
                {newsData.map(item => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
