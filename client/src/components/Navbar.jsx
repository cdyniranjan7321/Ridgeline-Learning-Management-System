
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive ? 'bg-ink-900 text-parchment-50' : 'text-ink-900/70 hover:bg-ink-900/5 hover:text-ink-900'
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const dashboardPath = user?.role === 'instructor' || user?.role === 'admin' ? '/instructor' : '/student';

  // Navigation items for mobile menu
  const navItems = [
    { to: '/courses', label: 'Explore Courses' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-parchment-50/90 backdrop-blur border-b border-ink-900/8">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="h-8 w-8 rounded-lg bg-ink-900 text-amber-400 font-display font-bold flex items-center justify-center text-sm">
            R
          </span>
          <span className="font-display font-bold text-lg tracking-tight">Ridgeline</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavItem to="/courses">Explore Courses</NavItem>
          <NavItem to="/about">About Us</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          {user && <NavItem to={dashboardPath}>Dashboard</NavItem>}
          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <NavItem to="/instructor/courses/new">Create Course</NavItem>
          )}
        </div>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink-900/70">
                Hi, <span className="font-semibold text-ink-900">{user.name.split(' ')[0]}</span>
              </span>
              <span className="badge bg-moss-500/10 text-moss-600 capitalize">{user.role}</span>
              <button onClick={handleLogout} className="btn-outline !py-2 !px-3">
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-outline !py-2 !px-3">
                Log in
              </Link>
              <Link to="/register" className="btn-accent !py-2 !px-3">
                Get started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-ink-900/5"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-ink-900/8 px-4 py-3 space-y-1 bg-parchment-50">
          
          {/* Main Navigation Links */}
          {navItems.map((item) => (
            <NavItem key={item.to} to={item.to}>
              {item.label}
            </NavItem>
          ))}
          
          {/* User-specific links */}
          {user && <NavItem to={dashboardPath}>Dashboard</NavItem>}
          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <NavItem to="/instructor/courses/new">Create Course</NavItem>
          )}
          
          {/* User Actions */}
          <div className="pt-2 border-t border-ink-900/8 mt-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-900/70">
                    Hi, <span className="font-semibold text-ink-900">{user.name}</span>
                  </span>
                  <span className="badge bg-moss-500/10 text-moss-600 capitalize text-xs">
                    {user.role}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn-outline w-full">
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="btn-outline w-full text-center" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link to="/register" className="btn-accent w-full text-center" onClick={() => setOpen(false)}>
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;