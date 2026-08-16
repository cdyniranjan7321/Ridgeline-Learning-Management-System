
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';
import ProgressRing from '../components/ProgressRing.jsx';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [reviews, setReviews] = useState([]);

  const isOwner = user && course && course.instructor?._id === user.id;
  const isStudent = user?.role === 'student';
  const isAdmin = user?.role === 'admin';

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data.course);
      if (res.data.course.lessons?.length) setActiveLesson(res.data.course.lessons[0]);

      if (user?.role === 'student') {
        const enr = await api.get(`/enrollments/course/${id}`);
        setEnrollment(enr.data.enrollment);
      }

      // Load reviews (mock - replace with real API)
      setReviews([
        { user: 'John Doe', rating: 5, comment: 'Excellent course! Very well structured.', date: '2 days ago' },
        { user: 'Jane Smith', rating: 4, comment: 'Great content, but could use more examples.', date: '1 week ago' },
        { user: 'Mike Johnson', rating: 5, comment: 'Best course I\'ve taken this year!', date: '2 weeks ago' },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load this course.');
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [load]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login', { state: { from: `/courses/${id}` } });
    setEnrolling(true);
    try {
      const res = await api.post(`/enrollments/${id}`);
      setEnrollment(res.data.enrollment);
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed.');
    } finally {
      setEnrolling(false);
    }
  };

  const markComplete = async (lessonId) => {
    try {
      const res = await api.put(`/enrollments/${id}/progress`, { lessonId });
      setEnrollment(res.data.enrollment);
    } catch {
      /* silent */
    }
  };

  const isLessonComplete = (lessonId) =>
    enrollment?.completedLessons?.some((l) => l.toString() === lessonId);

  const canWatch = isOwner || isAdmin || !!enrollment;

  // Calculate course stats
  const totalLessons = course?.lessons?.length || 0;
  const completedLessons = enrollment?.completedLessons?.length || 0;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="h-12 w-12 rounded-full border-4 border-ink-900/15 border-t-blue-600 animate-spin" />
        <p className="mt-4 text-ink-900/60 text-sm">Loading course content...</p>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h2>
        <p className="text-gray-500">{error}</p>
        <Link to="/courses" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {course.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  {course.level}
                </span>
                {!course.published && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full">
                    📝 Draft
                  </span>
                )}
                {course.price > 0 ? (
                  <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    💰 ${course.price}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    🎁 Free
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900">
                {course.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  👨‍🏫 by <span className="font-medium text-gray-700">{course.instructor?.name}</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">📚 {totalLessons} lessons</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">⭐ 4.8 (124 reviews)</span>
              </div>
            </div>
            {isOwner && (
              <Link
                to={`/instructor/courses/${id}/manage`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
              >
                ⚙️ Manage Course
              </Link>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Video Player & Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {canWatch && activeLesson ? (
                <div>
                  <VideoPlayer 
                    courseId={id} 
                    lessonId={activeLesson._id} 
                    title={activeLesson.title} 
                  />
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900">{activeLesson.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {activeLesson.duration || '10:00'} • Lesson {course.lessons.indexOf(activeLesson) + 1} of {totalLessons}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center justify-center text-center p-8 gap-4">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-4xl">
                    🔒
                  </div>
                  <p className="text-white font-display font-semibold text-lg">
                    Enroll to unlock video lessons
                  </p>
                  <p className="text-white/60 text-sm max-w-md">
                    Get full access to all {totalLessons} lessons and start learning today.
                  </p>
                  {isStudent && (
                    <button 
                      onClick={handleEnroll} 
                      disabled={enrolling} 
                      className="mt-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      {enrolling ? '⏳ Enrolling...' : course.price > 0 ? `💰 Enroll — $${course.price}` : '🎓 Enroll for free'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="text-red-500 text-lg">⚠️</span>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Course Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>📖</span> About this course
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
              
              {/* Course Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{totalLessons}</div>
                  <div className="text-xs text-gray-500">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{course.level}</div>
                  <div className="text-xs text-gray-500">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{course.category}</div>
                  <div className="text-xs text-gray-500">Category</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">
                    {course.price > 0 ? `$${course.price}` : 'Free'}
                  </div>
                  <div className="text-xs text-gray-500">Price</div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span>⭐</span> Student Reviews
                  </h2>
                  <span className="text-sm text-gray-500">{reviews.length} reviews</span>
                </div>
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{review.user}</p>
                          <div className="flex items-center gap-1 text-amber-400 text-sm">
                            {'⭐'.repeat(review.rating)}
                            <span className="text-gray-400 text-xs ml-1">({review.rating})</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            {isStudent && enrollment && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4">
                  <ProgressRing progress={progress} size={64} stroke={6} />
                  <div>
                    <p className="font-display font-semibold text-gray-900">
                      {enrollment.completed ? '🎉 Course complete!' : 'In progress'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {completedLessons} of {totalLessons} lessons done
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {progress}% complete
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Enrollment Card */}
            {isStudent && !enrollment && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Ready to start learning?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {course.price > 0 ? `💰 One-time payment of $${course.price}` : '🎁 This course is free'}
                </p>
                <button 
                  onClick={handleEnroll} 
                  disabled={enrolling} 
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {enrolling ? '⏳ Enrolling...' : '🎓 Enroll now'}
                </button>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  🛡️ 100% satisfaction guarantee
                </p>
              </div>
            )}

            {/* Lessons List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span>📋</span> Lessons
                  <span className="text-xs text-gray-400 font-normal">({totalLessons})</span>
                </h3>
                {totalLessons > 5 && (
                  <button
                    onClick={() => setShowAllLessons(!showAllLessons)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {showAllLessons ? 'Show Less' : 'Show All'}
                  </button>
                )}
              </div>
              <ul className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {course.lessons.slice(0, showAllLessons ? undefined : 5).map((lesson, idx) => {
                  const done = isLessonComplete(lesson._id);
                  const active = activeLesson?._id === lesson._id;
                  const isLocked = !canWatch;
                  const lessonNumber = course.lessons.indexOf(lesson) + 1;
                  
                  return (
                    <li key={lesson._id}>
                      <button
                        onClick={() => canWatch && setActiveLesson(lesson)}
                        disabled={isLocked}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all ${
                          active 
                            ? 'bg-blue-50 border-l-4 border-blue-600' 
                            : 'hover:bg-gray-50'
                        } ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                            done
                              ? 'bg-emerald-500 text-white'
                              : active
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {done ? '✓' : lessonNumber}
                        </span>
                        <span className={`flex-1 line-clamp-2 ${active ? 'text-blue-700' : 'text-gray-700'}`}>
                          {lesson.title}
                        </span>
                        {isLocked && <span className="text-gray-400 text-xs">🔒</span>}
                        {done && <span className="text-emerald-500 text-xs">✅</span>}
                        {active && isStudent && enrollment && !done && (
                          <span className="text-xs text-amber-600 font-medium">Watching</span>
                        )}
                      </button>
                      {active && isStudent && enrollment && !done && (
                        <div className="px-4 py-2 bg-blue-50/50 flex items-center gap-3">
                          <button
                            onClick={() => markComplete(lesson._id)}
                            className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            ✅ Mark as complete
                          </button>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">Progress saved automatically</span>
                        </div>
                      )}
                    </li>
                  );
                })}
                {course.lessons.length === 0 && (
                  <li className="text-sm text-gray-400 px-4 py-6 text-center">
                    No lessons published yet.
                  </li>
                )}
              </ul>
            </div>

            {/* Instructor Info */}
            {course.instructor && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>👨‍🏫</span> Instructor
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{course.instructor.name}</p>
                    <p className="text-xs text-gray-500">Instructor</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;