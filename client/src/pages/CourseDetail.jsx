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

  const isOwner = user && course && course.instructor?._id === user.id;
  const isStudent = user?.role === 'student';

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
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load this course.');
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    load();
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

  const canWatch = isOwner || user?.role === 'admin' || !!enrollment;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-ink-900/15 border-t-amber-500 animate-spin" />
      </div>
    );
  }

  if (error && !course) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-ink-900/60">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="badge bg-amber-500/15 text-amber-600">{course.level}</span>
          <span className="text-sm text-ink-900/50">{course.category}</span>
          {!course.published && <span className="badge bg-ink-950 text-parchment-50">Draft</span>}
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">{course.title}</h1>
        <p className="text-ink-900/60 mt-1">by {course.instructor?.name}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {canWatch && activeLesson ? (
            <VideoPlayer courseId={id} lessonId={activeLesson._id} title={activeLesson.title} />
          ) : (
            <div className="aspect-video rounded-xl2 bg-ink-900 flex flex-col items-center justify-center text-center p-8 gap-4">
              <p className="text-parchment-100 font-display font-semibold">
                Enroll to unlock video lessons
              </p>
              {isStudent && (
                <button onClick={handleEnroll} disabled={enrolling} className="btn-accent">
                  {enrolling ? 'Enrolling…' : course.price > 0 ? `Enroll — $${course.price}` : 'Enroll for free'}
                </button>
              )}
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="card p-5">
            <h2 className="font-display font-semibold text-ink-900 mb-2">About this course</h2>
            <p className="text-sm text-ink-900/70 whitespace-pre-line">{course.description}</p>
          </div>

          {isOwner && (
            <Link to={`/instructor/courses/${id}/manage`} className="btn-outline w-full sm:w-auto">
              Manage course & lessons
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {isStudent && enrollment && (
            <div className="card p-5 flex items-center gap-4">
              <ProgressRing progress={enrollment.progress} />
              <div>
                <p className="font-display font-semibold text-ink-900">
                  {enrollment.completed ? 'Course complete!' : 'In progress'}
                </p>
                <p className="text-xs text-ink-900/50">
                  {enrollment.completedLessons.length} of {course.lessons.length} lessons done
                </p>
              </div>
            </div>
          )}

          {isStudent && !enrollment && (
            <div className="card p-5">
              <p className="text-sm text-ink-900/60 mb-3">
                {course.price > 0 ? `$${course.price} · one-time` : 'Free course'}
              </p>
              <button onClick={handleEnroll} disabled={enrolling} className="btn-accent w-full">
                {enrolling ? 'Enrolling…' : 'Enroll now'}
              </button>
            </div>
          )}

          <div className="card p-3">
            <h3 className="font-display font-semibold text-ink-900 px-2 py-2">
              Lessons ({course.lessons.length})
            </h3>
            <ul className="space-y-1">
              {course.lessons.map((lesson, idx) => {
                const done = isLessonComplete(lesson._id);
                const active = activeLesson?._id === lesson._id;
                return (
                  <li key={lesson._id}>
                    <button
                      onClick={() => canWatch && setActiveLesson(lesson)}
                      disabled={!canWatch}
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        active ? 'bg-ink-900 text-parchment-50' : 'hover:bg-ink-900/5 text-ink-900'
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      <span
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                          done
                            ? 'bg-moss-500 text-white'
                            : active
                            ? 'bg-parchment-50/20 text-parchment-50'
                            : 'bg-ink-900/8 text-ink-900/60'
                        }`}
                      >
                        {done ? '✓' : idx + 1}
                      </span>
                      <span className="flex-1 line-clamp-1">{lesson.title}</span>
                    </button>
                    {active && isStudent && enrollment && !done && (
                      <button
                        onClick={() => markComplete(lesson._id)}
                        className="ml-11 mb-2 text-xs font-semibold text-amber-600 hover:underline"
                      >
                        Mark as complete
                      </button>
                    )}
                  </li>
                );
              })}
              {course.lessons.length === 0 && (
                <li className="text-sm text-ink-900/40 px-3 py-4 text-center">No lessons published yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
