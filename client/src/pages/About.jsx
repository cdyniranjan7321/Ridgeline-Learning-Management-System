
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      name: 'Niranjan Chaudhary',
      role: 'CEO & Founder',
      bio: '4+ years in EdTech, passionate about accessible education. Building the future of learning.',
      image: 'https://ui-avatars.com/api/?name=Niranjan+Chaudhary&background=4F46E5&color=fff&size=120',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Jane Smith',
      role: 'Head of Curriculum',
      bio: 'Former university professor with a PhD in Computer Science. Curriculum design expert.',
      image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=7C3AED&color=fff&size=120',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 8 years of experience in EdTech. Tech lead and architect.',
      image: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=0EA5E9&color=fff&size=120',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Sarah Williams',
      role: 'Community Manager',
      bio: 'Building inclusive learning communities worldwide. Expert in user engagement.',
      image: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=10B981&color=fff&size=120',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students', icon: '👨‍🎓', color: 'from-blue-500 to-blue-600' },
    { number: '200+', label: 'Courses Available', icon: '📚', color: 'from-purple-500 to-purple-600' },
    { number: '50+', label: 'Expert Instructors', icon: '👨‍🏫', color: 'from-emerald-500 to-emerald-600' },
    { number: '95%', label: 'Satisfaction Rate', icon: '⭐', color: 'from-amber-500 to-amber-600' }
  ];

  const milestones = [
    { year: '2022', title: 'Founded', description: 'Ridgeline LMS was founded with a vision to transform education.' },
    { year: '2023', title: 'First 1000 Students', description: 'Reached 1000 students within the first year of operation.' },
    { year: '2024', title: '200+ Courses', description: 'Expanded course catalog to over 200 courses across various domains.' },
    { year: '2025', title: 'Global Expansion', description: 'Expanded operations to 10+ countries worldwide.' },
    { year: '2026', title: 'Innovation Hub', description: 'Launched AI-powered learning features and community initiatives.' }
  ];

  const values = [
    {
      icon: '🎓',
      title: 'Accessibility',
      description: 'Making quality education available to everyone, regardless of background or location.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology and teaching methods.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Building a supportive community where learners and instructors thrive together.'
    },
    {
      icon: '🌟',
      title: 'Quality',
      description: 'Maintaining the highest standards in course content and learning experiences.'
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">About Us</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              About Ridgeline
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                Learning Management System
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8 leading-relaxed">
              We're on a mission to make quality education accessible to everyone, everywhere. 
              Join us in transforming the future of learning.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">2022</div>
                <div className="text-sm opacity-75">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">10K+</div>
                <div className="text-sm opacity-75">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">200+</div>
                <div className="text-sm opacity-75">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">95%</div>
                <div className="text-sm opacity-75">Satisfaction</div>
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

      {/* Mission/Vision/Values Tabs */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Our Core
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Drives Us</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Our mission, vision, and values guide everything we do at Ridgeline LMS.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['mission', 'vision', 'values'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            {activeTab === 'mission' && (
              <div className="text-center animate-fade-in">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  To democratize education by providing high-quality, affordable learning opportunities 
                  to learners worldwide, breaking down barriers to knowledge and skill development.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm">Accessible</span>
                  <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm">Affordable</span>
                  <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm">High-Quality</span>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="text-center animate-fade-in">
                <div className="text-6xl mb-4">👁️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  A world where anyone can learn anything, anytime, anywhere. We envision a future 
                  where education is a fundamental right, not a privilege.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <span className="bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm">Global Access</span>
                  <span className="bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm">Lifelong Learning</span>
                  <span className="bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm">Empowerment</span>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="animate-fade-in">
                <div className="text-center">
                  <div className="text-6xl mb-4">💡</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <span className="text-3xl">{value.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{value.title}</h4>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Our Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">By the Numbers</h2>
            <p className="text-gray-600 mt-2">The impact we've made in the education space</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm sm:text-base mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-purple-100 text-purple-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Company Milestones</h2>
            <p className="text-gray-600 mt-2">The key moments that shaped Ridgeline LMS</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="w-full md:w-1/2"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-600 rounded-full hidden md:flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                        <span className="text-sm font-semibold text-gray-900">{milestone.title}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              Our Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Meet the People Behind Ridgeline</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Passionate educators, developers, and innovators dedicated to transforming education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1 + 0.3}s both`
                }}
              >
                <div className="relative inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-blue-100 group-hover:border-blue-600 transition-colors"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-2">{member.bio}</p>
                
                {/* Social Icons */}
                <div className="flex justify-center gap-2 mt-4">
                  <a href={member.social.linkedin} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href={member.social.twitter} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href={member.social.github} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-base sm:text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Join thousands of students and instructors already using Ridgeline LMS to transform 
            education and build the future of learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/courses"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

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
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;