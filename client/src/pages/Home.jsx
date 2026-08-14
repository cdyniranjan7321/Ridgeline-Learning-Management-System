
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '🎬',
      title: 'Stream, don\'t just upload',
      body: 'Lessons play back instantly with seekable video streaming — no waiting on full downloads.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📊',
      title: 'Enrollment that tracks itself',
      body: 'Every completed lesson updates progress automatically, for the student and the instructor.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: '📈',
      title: 'A dashboard for each role',
      body: 'Students see what\'s next. Instructors see who\'s falling behind. Nobody digs for data.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students', icon: '👨‍🎓', color: 'from-blue-500 to-blue-600' },
    { number: '500+', label: 'Courses Available', icon: '📚', color: 'from-purple-500 to-purple-600' },
    { number: '200+', label: 'Expert Instructors', icon: '👨‍🏫', color: 'from-emerald-500 to-emerald-600' },
    { number: '95%', label: 'Satisfaction Rate', icon: '⭐', color: 'from-amber-500 to-amber-600' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=4F46E5&color=fff&size=60',
      quote: 'Ridgeline transformed how I learn. The video-first approach and progress tracking kept me motivated throughout my journey.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist',
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=7C3AED&color=fff&size=60',
      quote: 'As an instructor, the dashboard gives me clear insights into student progress. I can easily identify who needs extra help.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=0EA5E9&color=fff&size=60',
      quote: 'The platform is intuitive and beautiful. I love how I can track my learning progress and discover new courses.',
      rating: 4
    }
  ];

  const popularCourses = [
    {
      title: 'Web Development Bootcamp',
      category: 'Programming',
      students: 1243,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop'
    },
    {
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      students: 987,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=200&fit=crop'
    },
    {
      title: 'UI/UX Design Mastery',
      category: 'Design',
      students: 756,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop'
    }
  ];

  const categories = [
    { name: 'Programming', icon: '💻', count: '45+', color: 'from-blue-500 to-blue-600' },
    { name: 'Design', icon: '🎨', count: '30+', color: 'from-purple-500 to-purple-600' },
    { name: 'Business', icon: '💼', count: '25+', color: 'from-emerald-500 to-emerald-600' },
    { name: 'Marketing', icon: '📈', count: '20+', color: 'from-amber-500 to-amber-600' },
    { name: 'Data Science', icon: '📊', count: '35+', color: 'from-red-500 to-red-600' },
    { name: 'AI & ML', icon: '🤖', count: '28+', color: 'from-indigo-500 to-indigo-600' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Animation */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28">
        {/* Animated background elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div>
            <span className="inline-block badge bg-blue-500/10 text-blue-600 mb-5 animate-pulse-slow">
               Video-first learning
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.08] text-ink-900">
              Teach what you know.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learn what you don't.
              </span>
            </h1>
            <p className="mt-5 text-lg text-ink-900/60 max-w-lg">
              Ridgeline is a lean learning management system: upload video lessons, enroll students,
              and watch progress tick upward — one lesson at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {!user && (
                <>
                  <Link 
                    to="/register" 
                    className="group btn-accent px-6 py-3 text-base relative overflow-hidden"
                  >
                    <span className="relative z-10">Start learning free</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                  <Link 
                    to="/courses" 
                    className="btn-outline px-6 py-3 text-base hover:scale-105 transition-transform"
                  >
                    Browse courses →
                  </Link>
                </>
              )}
              {user && (
                <Link
                  to={user.role === 'student' ? '/student' : '/instructor'}
                  className="group btn-accent px-6 py-3 text-base relative overflow-hidden"
                >
                  <span className="relative z-10">Go to your dashboard</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              )}
            </div>
            
            {/* Trust badges */}
            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://ui-avatars.com/api/?name=User${i}&background=${['4F46E5', '7C3AED', '0EA5E9', '10B981'][i-1]}&color=fff&size=32`}
                    alt={`User ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">1,204+ students</p>
                <p className="text-xs text-ink-900/50">enrolled this month</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="card p-6 rotate-1 hover:rotate-0 transition-transform duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-semibold">Intro to Data Structures</p>
                <span className="badge bg-amber-500/15 text-amber-600 animate-pulse-slow">72%</span>
              </div>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-ink-900 to-ink-700 flex items-center justify-center mb-4 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping"></div>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="relative z-10 group-hover:scale-110 transition-transform">
                    <circle cx="12" cy="12" r="11" stroke="#F0AD4E" strokeWidth="1.5" />
                    <path d="M10 8l6 4-6 4V8z" fill="#F0AD4E" />
                  </svg>
                </div>
              </div>
              <div className="h-2 rounded-full bg-ink-900/8 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-progress" style={{ width: '72%' }} />
              </div>
              <div className="mt-3 flex justify-between text-xs text-ink-900/50">
                <span>Lesson 8 of 11</span>
                <span>4h 20m watched</span>
              </div>
            </div>
            <div className="card p-4 absolute -bottom-6 -left-6 w-44 -rotate-3 hidden sm:block hover:rotate-0 transition-transform hover:scale-105">
              <p className="text-xs text-ink-900/50 font-semibold uppercase tracking-wide">Enrolled</p>
              <p className="text-2xl font-display font-bold text-ink-900">1,204</p>
              <p className="text-xs text-blue-600 font-medium">↑ 12% this week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Our Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ridgeline by the Numbers</h2>
            <p className="text-gray-600 mt-2">The impact we've made in the education space</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                ref={el => sectionRefs.current[index] = el}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center opacity-0 transform translate-y-10"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-ink-900/8 bg-white/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block badge bg-purple-500/10 text-purple-600 mb-3">Features</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-900">
              Everything you need to succeed
            </h2>
            <p className="mt-3 text-ink-900/60 max-w-2xl mx-auto">
              Built for modern learners and educators, Ridgeline combines powerful features with simplicity.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map((f, index) => (
              <div 
                key={f.title}
                ref={el => sectionRefs.current[index + 4] = el}
                className="group opacity-0 transform translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <h3 className="font-display font-semibold text-ink-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-ink-900/60">{f.body}</p>
                  <div className="mt-4 inline-block text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-emerald-100 text-emerald-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Explore Popular Categories</h2>
            <p className="text-gray-600 mt-2">Find the perfect course in your area of interest</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                ref={el => sectionRefs.current[index + 7] = el}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center cursor-pointer opacity-0 transform translate-y-10"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                <p className="text-gray-500 text-xs mt-1">{category.count} courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="inline-block badge bg-amber-500/10 text-amber-600 mb-2">Popular</span>
              <h2 className="text-3xl font-display font-bold text-ink-900">Trending Courses</h2>
            </div>
            <Link to="/courses" className="text-blue-600 hover:text-blue-700 font-medium">
              View all →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {popularCourses.map((course, index) => (
              <div 
                key={index}
                ref={el => sectionRefs.current[index + 13] = el}
                className="group opacity-0 transform translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
                      ⭐ {course.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-blue-600 font-medium mb-1">{course.category}</p>
                    <h3 className="font-semibold text-ink-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex justify-between text-sm text-ink-900/50">
                      <span>{course.students} students</span>
                      <span>🎯 {Math.round(course.rating * 20)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block badge bg-amber-500/10 text-amber-600 mb-2">Testimonials</span>
            <h2 className="text-3xl font-display font-bold text-ink-900">What our community says</h2>
            <p className="text-gray-600 mt-2">Real stories from real learners and instructors</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                ref={el => sectionRefs.current[index + 16] = el}
                className="opacity-0 transform translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-ink-900">{testimonial.name}</p>
                      <p className="text-xs text-ink-900/50">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  <p className="text-sm text-ink-900/70 italic">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* <div className="text-6xl mb-4">🚀</div> */}
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Ready to start your learning journey?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and instructors who are already using Ridgeline to transform education.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started Free
              </Link>
              <Link 
                to="/courses" 
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <Link 
              to={user.role === 'student' ? '/student' : '/instructor'}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          from { width: 0; }
          to { width: 72%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-progress {
          animation: progress 2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;