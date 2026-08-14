
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'support@ridgelinelms.com',
      link: 'mailto:support@ridgelinelms.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📞',
      title: 'Phone',
      details: '+977-984-1234567',
      link: 'tel:+9779841234567',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📍',
      title: 'Address',
      details: 'Lakeside, Pokhara-6, Nepal',
      link: '#',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🕐',
      title: 'Working Hours',
      details: 'Mon-Fri: 9:00 AM - 6:00 PM (NPT)',
      link: '#',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const faqs = [
    {
      question: 'How quickly will I get a response?',
      answer: 'We typically respond within 24 hours during business days.'
    },
    {
      question: 'Can I request a demo?',
      answer: 'Yes! Contact us and we\'ll schedule a personalized demo for you.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'We offer a 14-day free trial with full access to all features.'
    }
  ];

  // Google Maps Embed URL for Pokhara
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.036252732825!2d83.9744473!3d28.2095832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995956c8d9f7b0b%3A0x5b0d7b7f7b7b7b7b!2sPokhara%2C%20Nepal!5e0!3m2!1sen!2snp!4v1640000000000";

  return (
    <div className="bg-white">
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
              <span className="text-sm font-medium">We're here to help</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Get in Touch
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                We'd Love to Hear From You
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8 leading-relaxed">
              Have questions, feedback, or need support? Reach out to us and we'll respond as quickly as possible.
            </p>

            {/* Quick Contact Options */}
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:support@ridgelinelms.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                <span>📧</span>
                Email Us
              </a>
              <a 
                href="tel:+9779841234567" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30"
              >
                <span>📞</span>
                Call Us
              </a>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Connect With Us
            </h2>
            <p className="text-gray-600 mb-6">
              Choose your preferred way to reach us. We're available through multiple channels to serve you better.
            </p>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="group flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{info.details}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">
                  ✉️
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
                  <p className="text-sm text-gray-500">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📝</span>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">💬</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full pl-10 pr-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all`}
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  <div className="text-right text-xs text-gray-400 mt-1">
                    {formData.message.length}/500 characters
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Message Sent Successfully!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message ✨
                    </span>
                  )}
                </button>

                {isSubmitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center animate-fade-in">
                    <p className="text-green-700 font-medium">
                      🎉 Thank you! Your message has been sent successfully.
                    </p>
                    <p className="text-green-600 text-sm mt-1">We'll get back to you within 24 hours.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps Section - Pokhara */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              📍 Find Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Visit Our Office</h2>
            <p className="text-gray-600 mt-2">Lakeside, Pokhara-6, Nepal</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="relative w-full h-96">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Pokhara, Nepal"
                className="hover:opacity-95 transition-opacity"
              ></iframe>
              
              {/* Map Overlay Info */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Ridgeline LMS</p>
                    <p className="text-gray-600 text-xs">Lakeside, Pokhara-6</p>
                    <p className="text-gray-600 text-xs">Nepal</p>
                    <a 
                      href="https://www.google.com/maps/dir//Pokhara,+Nepal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-blue-600 text-xs font-medium hover:text-blue-700"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-gray-50">
              <a 
                href="https://www.google.com/maps/dir//Pokhara,+Nepal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm text-gray-700 hover:text-blue-600"
              >
                <span>🗺️</span> Directions
              </a>
              <a 
                href="https://www.google.com/maps/place/Pokhara/@28.2095832,83.9744473,12z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm text-gray-700 hover:text-blue-600"
              >
                <span>🖼️</span> Street View
              </a>
              <button 
                onClick={() => window.open('https://www.google.com/maps/place/Pokhara/@28.2095832,83.9744473,12z', '_blank')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm text-gray-700 hover:text-blue-600"
              >
                <span>🔍</span> Explore Area
              </button>
              <a 
                href="https://www.google.com/maps/place/Pokhara/@28.2095832,83.9744473,12z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <span>📱</span> Open in Maps
              </a>
            </div>
          </div>

          {/* Nearby Landmarks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="text-2xl mb-1">🏔️</div>
              <p className="font-semibold text-gray-800 text-sm">Fewa Lake</p>
              <p className="text-gray-500 text-xs">5 min walk</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="text-2xl mb-1">⛰️</div>
              <p className="font-semibold text-gray-800 text-sm">World Peace Stupa</p>
              <p className="text-gray-500 text-xs">15 min drive</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="text-2xl mb-1">🪂</div>
              <p className="font-semibold text-gray-800 text-sm">Sarangkot</p>
              <p className="text-gray-500 text-xs">30 min drive</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="text-2xl mb-1">🏘️</div>
              <p className="font-semibold text-gray-800 text-sm">Lakeside Street</p>
              <p className="text-gray-500 text-xs">2 min walk</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2">Find quick answers to common questions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
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

export default Contact;