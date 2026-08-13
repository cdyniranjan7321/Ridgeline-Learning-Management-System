import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge bg-moss-500/10 text-moss-600 mb-5">Video-first learning</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold leading-[1.08] text-ink-900">
              Teach what you know.
              <br />
              Learn what you don't.
            </h1>
            <p className="mt-5 text-lg text-ink-900/60 max-w-lg">
              Ridgeline is a lean learning management system: upload video lessons, enroll students,
              and watch progress tick upward — one lesson at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {!user && (
                <>
                  <Link to="/register" className="btn-accent px-6 py-3 text-base">
                    Start learning free
                  </Link>
                  <Link to="/courses" className="btn-outline px-6 py-3 text-base">
                    Browse courses
                  </Link>
                </>
              )}
              {user && (
                <Link
                  to={user.role === 'student' ? '/student' : '/instructor'}
                  className="btn-accent px-6 py-3 text-base"
                >
                  Go to your dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="card p-6 rotate-1">
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-semibold">Intro to Data Structures</p>
                <span className="badge bg-amber-500/15 text-amber-600">72%</span>
              </div>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-ink-900 to-ink-700 flex items-center justify-center mb-4">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="#F0AD4E" strokeWidth="1.5" />
                  <path d="M10 8l6 4-6 4V8z" fill="#F0AD4E" />
                </svg>
              </div>
              <div className="h-2 rounded-full bg-ink-900/8 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '72%' }} />
              </div>
              <div className="mt-3 flex justify-between text-xs text-ink-900/50">
                <span>Lesson 8 of 11</span>
                <span>4h 20m watched</span>
              </div>
            </div>
            <div className="card p-4 absolute -bottom-6 -left-6 w-44 -rotate-3 hidden sm:block">
              <p className="text-xs text-ink-900/50 font-semibold uppercase tracking-wide">Enrolled</p>
              <p className="text-2xl font-display font-bold text-ink-900">1,204</p>
              <p className="text-xs text-moss-600 font-medium">students this term</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-900/8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-3 gap-8">
          {[
            {
              title: 'Stream, don\u2019t just upload',
              body: 'Lessons play back instantly with seekable video streaming — no waiting on full downloads.',
            },
            {
              title: 'Enrollment that tracks itself',
              body: 'Every completed lesson updates progress automatically, for the student and the instructor.',
            },
            {
              title: 'A dashboard for each role',
              body: 'Students see what\u2019s next. Instructors see who\u2019s falling behind. Nobody digs for data.',
            },
          ].map((f) => (
            <div key={f.title}>
              <h3 className="font-display font-semibold text-ink-900 mb-2">{f.title}</h3>
              <p className="text-sm text-ink-900/60">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
