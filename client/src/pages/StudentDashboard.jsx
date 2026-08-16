
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

  useEffect(() => {
    api
      .get('/dashboard/student')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-ink-900/15 border-t-amber-500 animate-spin" />
      </div>
    );
  }

  const { stats, enrollments } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="text-ink-900/60 mt-1">Here's where you left off.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Enrolled courses" value={stats.totalCourses} />
        <StatCard label="In progress" value={stats.inProgress} accent="text-amber-600" />
        <StatCard label="Completed" value={stats.completedCourses} accent="text-moss-600" />
        <StatCard label="Avg. progress" value={`${stats.avgProgress}%`} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-bold text-ink-900">My courses</h2>
        <Link to="/courses" className="text-sm font-semibold text-amber-600 hover:underline">
          Browse more →
        </Link>
      </div>

      {enrollments.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-ink-900/60 mb-4">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="btn-accent">
            Explore the catalog
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enr) => (
            <Link
              to={`/courses/${enr.course._id}`}
              key={enr._id}
              className="card p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-ink-900 line-clamp-2">{enr.course.title}</h3>
                  <p className="text-xs text-ink-900/50 mt-1">by {enr.course.instructor?.name}</p>
                </div>
                <ProgressRing progress={enr.progress} size={48} stroke={4} />
              </div>
              <div className="mt-auto flex items-center justify-between text-xs text-ink-900/50">
                <span>
                  {enr.completedLessons.length}/{enr.course.lessons?.length || 0} lessons
                </span>
                <span className={enr.completed ? 'text-moss-600 font-semibold' : ''}>
                  {enr.completed ? 'Completed' : 'Continue →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
