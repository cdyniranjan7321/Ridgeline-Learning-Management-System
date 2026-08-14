
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Successful Online Learning',
      excerpt: 'Discover proven strategies to maximize your online learning experience and stay motivated throughout your journey.',
      category: 'Learning Tips',
      author: 'Dr. Sarah Johnson',
      date: 'August 10, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'The Future of Education: AI in the Classroom',
      excerpt: 'Explore how artificial intelligence is transforming education and creating personalized learning experiences.',
      category: 'Technology',
      author: 'Prof. Michael Chen',
      date: 'August 5, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Building a Growth Mindset for Career Success',
      excerpt: 'Learn how developing a growth mindset can accelerate your career progression and open new opportunities.',
      category: 'Career Development',
      author: 'Emily Rodriguez',
      date: 'July 28, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Mastering Time Management as a Student',
      excerpt: 'Effective time management strategies for students to balance academics, work, and personal life.',
      category: 'Student Life',
      author: 'David Kim',
      date: 'July 20, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Why Continuous Learning Matters in 2026',
      excerpt: 'The importance of lifelong learning in today\'s rapidly evolving job market and technological landscape.',
      category: 'Learning Tips',
      author: 'Dr. Sarah Johnson',
      date: 'July 15, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'How to Choose the Right Course for Your Goals',
      excerpt: 'A comprehensive guide to selecting courses that align with your career aspirations and learning style.',
      category: 'Career Development',
      author: 'Emily Rodriguez',
      date: 'July 10, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop'
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured post (latest or most popular)
  const featuredPost = blogPosts[0];

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse-slow">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">Latest Insights & Updates</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Our Blog
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                & Learning Hub
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8 leading-relaxed">
              Discover expert insights, practical tips, and inspiring stories to accelerate your learning journey and achieve your goals.
            </p>

            {/* Search Bar in Hero */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm p-2 rounded-2xl border border-white/20">
                <div className="flex-1 relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles, topics, or authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-xl border-0 focus:ring-2 focus:ring-white/50 outline-none transition-all"
                  />
                </div>
                <button className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                  Search
                </button>
              </div>

              {/* Trending Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="text-xs text-white/70">Trending:</span>
                {['Learning Tips', 'Technology', 'Career Growth', 'Student Life'].map((tag) => (
                  <span 
                    key={tag}
                    onClick={() => setSelectedCategory(tag)}
                    className="text-xs bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full cursor-pointer transition-all hover:scale-105"
                  >
                    #{tag.replace(/\s/g, '')}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-10">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{blogPosts.length}</div>
                <div className="text-sm opacity-75">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">6</div>
                <div className="text-sm opacity-75">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">5 min</div>
                <div className="text-sm opacity-75">Avg. Read Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40L60 50C120 60 240 80 360 80C480 80 600 60 720 50C840 40 960 40 1080 50C1200 60 1320 80 1380 80L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Category Filter Bar - Sticky */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-1 text-xs opacity-60">
                    ({blogPosts.filter(p => p.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post (optional) */}
      {selectedCategory === 'All' && !searchTerm && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="flex flex-col justify-center order-2 md:order-1">
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                  Featured Article
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{featuredPost.author}</p>
                      <p className="text-xs text-gray-500">{featuredPost.date}</p>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Read Now →
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-48 md:h-64 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-xs font-medium text-white bg-blue-600/90 backdrop-blur-sm px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white">
                    {post.readTime}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    <span className="text-blue-600 group-hover:translate-x-1 transition-transform font-medium">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Blog;