
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import StatCard from '../components/StatCard.jsx';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    api
      .get('/dashboard/instructor')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="h-12 w-12 rounded-full border-4 border-ink-900/15 border-t-blue-600 animate-spin" />
        <p className="mt-4 text-ink-900/60 text-sm">Loading your dashboard...</p>
      </div>
    );
  }

  const { stats, perCourseStats } = data;

  // Filter courses
  const filteredCourses = activeTab === 'all' 
    ? perCourseStats 
    : activeTab === 'published' 
      ? perCourseStats.filter(c => c.course.published) 
      : perCourseStats.filter(c => !c.course.published);

  // Quick stats for cards
  const quickStats = [
    { label: 'Total Courses', value: stats.totalCourses, icon: '📚', color: 'from-blue-500 to-blue-600' },
    { label: 'Published', value: stats.publishedCourses, icon: '✅', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Students', value: stats.totalStudents, icon: '👨‍🎓', color: 'from-purple-500 to-purple-600' },
    { label: 'Enrollments', value: stats.totalEnrollments, icon: '📊', color: 'from-amber-500 to-amber-600' },
    { label: 'Avg. Completion', value: `${stats.avgCompletionRate}%`, icon: '🎯', color: 'from-red-500 to-red-600' },
  ];

  // Recent activity (mock data - replace with real data from API)
  const recentActivities = [
    { type: 'enrollment', student: 'John Doe', course: 'Web Development Bootcamp', time: '2 hours ago' },
    { type: 'completion', student: 'Sarah Smith', course: 'Data Science Fundamentals', time: '5 hours ago' },
    { type: 'review', student: 'Mike Johnson', course: 'UI/UX Design Mastery', time: '1 day ago' },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'enrollment': return '🎓';
      case 'completion': return '🏆';
      case 'review': return '⭐';
      default: return '📌';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Welcome back, {user.name.split(' ')[0]}!
                  </h1>
                  <p className="text-white/80 text-sm">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/instructor/courses/new" className="group bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
              <span>+</span>
              Create New Course
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div 
              key={index}
              className="group bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Courses List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header with Tabs */}
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {perCourseStats.length}
                  </span>
                </div>
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab('published')}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      activeTab === 'published' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    onClick={() => setActiveTab('draft')}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      activeTab === 'draft' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Drafts
                  </button>
                </div>
              </div>

              {/* Course List */}
              {filteredCourses.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-gray-600 mb-4">No {activeTab === 'draft' ? 'draft' : activeTab === 'published' ? 'published' : ''} courses yet.</p>
                  <Link to="/instructor/courses/new" className="btn-accent inline-block">
                    Create your first course
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredCourses.map(({ course, enrolledCount, avgProgress }) => (
                    <div key={course._id} className="group hover:bg-gray-50 transition-colors p-4 sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              course.published 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {course.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <span>👨‍🎓</span> {enrolledCount} students
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="flex items-center gap-1">
                              <span>📊</span> {avgProgress}% avg. progress
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/instructor/courses/${course._id}/manage`}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            Manage
                          </Link>
                          <Link
                            to={`/courses/${course._id}`}
                            className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="mt-2 w-full">
                        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${avgProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>📈</span> Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="font-semibold text-gray-900">{stats.totalStudents}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Enrollments</span>
                  <span className="font-semibold text-gray-900">{stats.totalEnrollments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Completion</span>
                  <span className="font-semibold text-gray-900">{stats.avgCompletionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Published Courses</span>
                  <span className="font-semibold text-gray-900">{stats.publishedCourses}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🔄</span> Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.student}</span>
                        <span className="text-gray-600"> {activity.type === 'enrollment' ? 'enrolled in' : activity.type === 'completion' ? 'completed' : 'reviewed'} </span>
                        <span className="font-medium">{activity.course}</span>
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Activity →
              </button>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Pro Tip</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Engage your students with regular updates and interactive content. Courses with video content have 40% higher completion rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;