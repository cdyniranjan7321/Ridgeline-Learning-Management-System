
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import StatCard from '../components/StatCard.jsx';
import ProgressRing from '../components/ProgressRing.jsx';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    api
      .get('/dashboard/student')
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

  const { stats, enrollments } = data;

  // Filter enrollments
  const filteredEnrollments = activeTab === 'all' 
    ? enrollments 
    : activeTab === 'in-progress' 
      ? enrollments.filter(e => !e.completed && e.progress > 0) 
      : activeTab === 'completed' 
        ? enrollments.filter(e => e.completed) 
        : enrollments.filter(e => e.progress === 0);

  // Quick stats for cards
  const quickStats = [
    { label: 'Enrolled Courses', value: stats.totalCourses, icon: '📚', color: 'from-blue-500 to-blue-600' },
    { label: 'In Progress', value: stats.inProgress, icon: '📖', color: 'from-amber-500 to-amber-600' },
    { label: 'Completed', value: stats.completedCourses, icon: '✅', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Avg. Progress', value: `${stats.avgProgress}%`, icon: '📊', color: 'from-purple-500 to-purple-600' },
  ];

  // Achievement mock data (replace with real data from API)
  const achievements = [
    { title: 'First Course', description: 'Completed your first course', icon: '🏆', earned: true },
    { title: 'Quick Learner', description: 'Completed 5 courses', icon: '⭐', earned: stats.completedCourses >= 5 },
    { title: 'Dedicated Student', description: 'Watched 50+ hours', icon: '🎯', earned: stats.totalCourses >= 3 },
    { title: 'Perfect Score', description: '100% in any course', icon: '💯', earned: stats.avgProgress === 100 },
  ];

  // Recent activity (mock data - replace with real data from API)
  const recentActivities = [
    { type: 'completed', title: 'Completed "Web Development Bootcamp"', time: '2 hours ago' },
    { type: 'watched', title: 'Watched "Data Science Fundamentals" Lesson 5', time: '5 hours ago' },
    { type: 'enrolled', title: 'Enrolled in "UI/UX Design Mastery"', time: '1 day ago' },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'completed': return '🎉';
      case 'watched': return '👀';
      case 'enrolled': return '🎓';
      default: return '📌';
    }
  };

  // Recommended courses (mock data - replace with real data from API)
  const recommendedCourses = [
    { title: 'Advanced React Patterns', category: 'Programming', rating: 4.9, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop' },
    { title: 'Machine Learning A-Z', category: 'Data Science', rating: 4.8, image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=200&fit=crop' },
    { title: 'UI/UX Design Pro', category: 'Design', rating: 4.7, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Welcome back, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-white/80 text-sm">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <Link to="/courses" className="group bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
                <span>🔍</span>
                Find New Courses
              </Link>
            </div>
            {/* Learning Streak */}
            <div className="mt-4 flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <span>🔥</span>
                <span className="text-sm font-medium">{Math.floor(Math.random() * 20) + 1} day streak</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span className="text-sm font-medium">{Math.floor(Math.random() * 100) + 20}h watched</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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
          {/* Main Content - Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header with Tabs */}
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {enrollments.length}
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
                    onClick={() => setActiveTab('in-progress')}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      activeTab === 'in-progress' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      activeTab === 'completed' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              {/* Courses Grid */}
              {filteredEnrollments.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-gray-600 mb-4">
                    {activeTab === 'completed' 
                      ? "You haven't completed any courses yet." 
                      : activeTab === 'in-progress' 
                        ? "You don't have any courses in progress." 
                        : "You haven't enrolled in any courses yet."}
                  </p>
                  <Link to="/courses" className="btn-accent inline-block">
                    Explore Courses
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                  {filteredEnrollments.map((enr) => (
                    <Link
                      to={`/courses/${enr.course._id}`}
                      key={enr._id}
                      className="group bg-gray-50 hover:bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            {enr.completed && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                                ✅ Completed
                              </span>
                            )}
                            {!enr.completed && enr.progress > 0 && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                                📖 In Progress
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {enr.course.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">by {enr.course.instructor?.name || 'Unknown'}</p>
                        </div>
                        <ProgressRing progress={enr.progress} size={48} stroke={4} />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {enr.completedLessons.length}/{enr.course.lessons?.length || 0} lessons
                        </span>
                        <span className={enr.completed ? 'text-emerald-600 font-semibold' : 'text-blue-600 font-medium'}>
                          {enr.completed ? '🎉 Completed' : 'Continue →'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🏅</span> Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 ${!achievement.earned ? 'opacity-50' : ''}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <span className="text-emerald-500 text-xs font-medium">✓</span>
                    )}
                  </div>
                ))}
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
                      <p className="text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🌟</span> Recommended for You
              </h3>
              <div className="space-y-3">
                {recommendedCourses.map((course, index) => (
                  <Link key={index} to="/courses" className="block bg-white rounded-lg p-3 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{course.category}</span>
                          <span>•</span>
                          <span>⭐ {course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/courses" className="block mt-3 text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All Recommendations →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;