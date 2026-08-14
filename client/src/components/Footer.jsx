
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed email:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle navigation with scroll to top
  const handleNavClick = (e, path) => {
    e.preventDefault();
    scrollToTop();
    // Navigate after a small delay to ensure scroll completes
    setTimeout(() => {
      window.location.href = path;
    }, 100);
  };

  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      url: '#'
    },
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: '#'
    },
    { 
      name: 'GitHub', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      url: '#'
    },
    { 
      name: 'YouTube', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      url: '#'
    }
  ];

  // Navigation links with scroll to top
  const navLinks = [
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/blog', label: 'Blog' }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Main Footer Content - More compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Brand Section - Compact */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Ridgeline LMS</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-1 max-w-xs mx-auto sm:mx-0">
              Empowering learners worldwide.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110 duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div>
            <button
              className="w-full flex items-center justify-between sm:cursor-default sm:pointer-events-none"
              onClick={() => toggleSection('quickLinks')}
            >
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Quick Links</h4>
              <span className="sm:hidden text-gray-400 text-lg">
                {openSection === 'quickLinks' ? '−' : '+'}
              </span>
            </button>
            <ul className={`space-y-1 text-xs sm:text-sm mt-2 ${openSection === 'quickLinks' || window.innerWidth >= 640 ? 'block' : 'hidden sm:block'}`}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to}
                    onClick={scrollToTop}
                    className="text-gray-600 hover:text-blue-600 transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - Compact */}
          <div>
            <button
              className="w-full flex items-center justify-between sm:cursor-default sm:pointer-events-none"
              onClick={() => toggleSection('support')}
            >
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Support</h4>
              <span className="sm:hidden text-gray-400 text-lg">
                {openSection === 'support' ? '−' : '+'}
              </span>
            </button>
            <ul className={`space-y-1 text-xs sm:text-sm mt-2 ${openSection === 'support' || window.innerWidth >= 640 ? 'block' : 'hidden sm:block'}`}>
              <li><Link to="#faq" onClick={scrollToTop} className="text-gray-600 hover:text-blue-600 transition-colors block py-0.5">FAQ</Link></li>
              <li><Link to="#help" onClick={scrollToTop} className="text-gray-600 hover:text-blue-600 transition-colors block py-0.5">Help Center</Link></li>
              <li><Link to="#privacy" onClick={scrollToTop} className="text-gray-600 hover:text-blue-600 transition-colors block py-0.5">Privacy</Link></li>
              <li><Link to="#terms" onClick={scrollToTop} className="text-gray-600 hover:text-blue-600 transition-colors block py-0.5">Terms</Link></li>
            </ul>
          </div>

          {/* Newsletter - Compact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base text-center sm:text-left">Stay Updated</h4>
            <form 
              className="flex flex-col xs:flex-row gap-1.5 mt-2 max-w-xs mx-auto sm:mx-0" 
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="flex-1 px-2.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-[100px]"
                required
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-50"
                disabled={isSubscribed}
              >
                {isSubscribed ? '✓' : 'Subscribe'}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-green-600 text-xs text-center sm:text-left mt-1">✓ Subscribed!</p>
            )}
          </div>
        </div>

        {/* Bottom Bar - Very Compact */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-xs text-gray-500">
          <span>© {currentYear} Ridgeline LMS</span>
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3">
            <span className="flex items-center gap-1">
              <span>Built with ❤️</span>
              <span className="hidden xs:inline">•</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-blue-600 font-medium">MERN</span>
              <span className="hidden xs:inline">&</span>
            </span>
            <span className="text-indigo-600 font-medium">Tailwind</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-gray-400">v2.0</span>
            </span>
          </div>
        </div>
      </div>

      {/* Back to Top Button (Optional) */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-50"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;