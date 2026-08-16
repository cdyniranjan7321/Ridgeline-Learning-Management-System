import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import CourseCard from '../components/CourseCard.jsx';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Categories (mock data - replace with real categories from API)
  const categories = [
    'All Categories',
    'Programming',
    'Data Science',
    'Design',
    'Business',
    'Marketing',
    'AI & ML',
    'Web Development'
  ];

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (level) params.level = level;
      if (category && category !== 'All Categories') params.category = category;
      if (sortBy) params.sortBy = sortBy;
      const res = await api.get('/courses', { params });
      setCourses(res.data.courses);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchCourses, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, level, category, sortBy]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Quick stats
  const totalCourses = courses.length;
  const freeCourses = courses.filter(c => c.price === 0 || !c.price).length;
  const paidCourses = totalCourses - freeCourses;

  const clearFilters = () => {
    setSearch('');
    setLevel('');
    setCategory('');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 mb-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">
                  Explore Courses
                </h1>
                <p className="text-white/80 text-sm md:text-base mt-1">
                  Find your next skill, taught by working practitioners.
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-white/70 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-white">{totalCourses}</span> Courses
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-white">{freeCourses}</span> Free
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-white">{paidCourses}</span> Premium
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2 text-sm font-medium"
              >
                <span>🔍</span>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                <span className="text-xs">{showFilters ? '▲' : '▼'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8 transition-all duration-300 ${
          showFilters ? 'block' : 'hidden'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Search Courses
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Search by title or topic..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Level
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sort By
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="latest">Latest</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {totalCourses} courses found
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:inline">
              Showing {courses.length} courses
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span>⊞</span> Grid
                </span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span>≡</span> List
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 h-80 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any courses matching your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-1'} gap-6`}>
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* Load More (Pagination) */}
        {courses.length > 0 && courses.length >= 12 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              Load More Courses
            </button>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/courses" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-1">💻</div>
            <span className="text-sm font-medium text-gray-700">Programming</span>
          </Link>
          <Link to="/courses" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-1">📊</div>
            <span className="text-sm font-medium text-gray-700">Data Science</span>
          </Link>
          <Link to="/courses" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-1">🎨</div>
            <span className="text-sm font-medium text-gray-700">Design</span>
          </Link>
          <Link to="/courses" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-1">💼</div>
            <span className="text-sm font-medium text-gray-700">Business</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;