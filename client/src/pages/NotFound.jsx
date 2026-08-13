import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <p className="font-display text-6xl font-bold text-ink-900/15">404</p>
    <h1 className="text-xl font-display font-semibold text-ink-900 mt-2">Page not found</h1>
    <p className="text-ink-900/60 mt-1">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-accent mt-6">
      Back to home
    </Link>
  </div>
);

export default NotFound;
