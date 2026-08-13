import React from 'react';

const Footer = () => (
  <footer className="border-t border-ink-900/8 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-900/50">
      <span>© {new Date().getFullYear()} Ridgeline LMS</span>
      <span>Built with the MERN stack &amp; Tailwind CSS</span>
    </div>
  </footer>
);

export default Footer;
