import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: '10+ years in EdTech, passionate about accessible education.',
      image: 'https://ui-avatars.com/api/?name=John+Doe&background=4F46E5&color=fff&size=100'
    },
    {
      name: 'Jane Smith',
      role: 'Head of Curriculum',
      bio: 'Former university professor with a PhD in Computer Science.',
      image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=7C3AED&color=fff&size=100'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 8 years of experience in EdTech.',
      image: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=0EA5E9&color=fff&size=100'
    },
    {
      name: 'Sarah Williams',
      role: 'Community Manager',
      bio: 'Building inclusive learning communities worldwide.',
      image: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=10B981&color=fff&size=100'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Students' },
    { number: '200+', label: 'Courses' },
    { number: '50+', label: 'Instructors' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Ridgeline LMS
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            We're on a mission to make quality education accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                To democratize education by providing high-quality, affordable learning opportunities.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-3">👁️</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                A world where anyone can learn anything, anytime, anywhere.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Innovation, inclusivity, quality, and community-driven learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm sm:text-base mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3"
                />
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 text-sm">{member.role}</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Start Learning?</h2>
          <p className="text-base sm:text-lg mb-6 opacity-90">
            Join thousands of students already learning on Ridgeline LMS.
          </p>
          <Link
            to="/courses"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Courses
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;