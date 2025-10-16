import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} Computer Science Department | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;