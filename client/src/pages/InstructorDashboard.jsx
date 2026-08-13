import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import StatCard from '../components/StatCard.jsx';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/dashboard/instructor')
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

  const { stats, perCourseStats } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">
            {user.name.split(' ')[0]}'s studio
          </h1>
          <p className="text-ink-900/60 mt-1">Manage courses and track how students are progressing.</p>
        </div>
        <Link to="/instructor/courses/new" className="btn-accent">
          + New course
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <StatCard label="Courses" value={stats.totalCourses} />
        <StatCard label="Published" value={stats.publishedCourses} accent="text-moss-600" />
        <StatCard label="Students" value={stats.totalStudents} />
        <StatCard label="Enrollments" value={stats.totalEnrollments} />
        <StatCard label="Avg. completion" value={`${stats.avgCompletionRate}%`} accent="text-amber-600" />
      </div>

      <h2 className="text-xl font-display font-bold text-ink-900 mb-4">My courses</h2>

      {perCourseStats.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-ink-900/60 mb-4">You haven't created any courses yet.</p>
          <Link to="/instructor/courses/new" className="btn-accent">
            Create your first course
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink-900/50 border-b border-ink-900/8">
            <span className="col-span-5">Course</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Students</span>
            <span className="col-span-2">Avg. progress</span>
            <span className="col-span-1"></span>
          </div>
          {perCourseStats.map(({ course, enrolledCount, avgProgress }) => (
            <div
              key={course._id}
              className="grid grid-cols-2 sm:grid-cols-12 gap-3 sm:gap-4 items-center px-5 py-4 border-b last:border-0 border-ink-900/8"
            >
              <div className="col-span-2 sm:col-span-5 font-medium text-ink-900 truncate">{course.title}</div>
              <div className="sm:col-span-2">
                <span
                  className={`badge ${
                    course.published ? 'bg-moss-500/10 text-moss-600' : 'bg-ink-900/8 text-ink-900/60'
                  }`}
                >
                  {course.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="sm:col-span-2 text-sm text-ink-900/70">{enrolledCount} enrolled</div>
              <div className="sm:col-span-2">
                <div className="h-2 w-full rounded-full bg-ink-900/8 overflow-hidden max-w-[120px]">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${avgProgress}%` }} />
                </div>
              </div>
              <div className="sm:col-span-1 flex justify-end gap-3 text-sm">
                <Link to={`/instructor/courses/${course._id}/manage`} className="font-semibold text-amber-600 hover:underline">
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
