import React from 'react';
import { Link } from 'react-router-dom';

const levelColor = {
  Beginner: 'bg-moss-500/10 text-moss-600',
  Intermediate: 'bg-amber-500/15 text-amber-600',
  Advanced: 'bg-ink-900/10 text-ink-900',
};

const CourseCard = ({ course, footer }) => {
  return (
    <div className="card overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <Link to={`/courses/${course._id}`} className="block">
        <div className="aspect-video bg-ink-900/5 relative overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ink-900 to-ink-700">
              <span className="font-display text-parchment-100/40 text-3xl font-bold">
                {course.title?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
          {!course.published && (
            <span className="absolute top-2 right-2 badge bg-ink-950 text-parchment-50">Draft</span>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <span className={`badge ${levelColor[course.level] || levelColor.Beginner}`}>{course.level}</span>
          <span className="text-xs text-ink-900/50">{course.lessons?.length || 0} lessons</span>
        </div>
        <Link to={`/courses/${course._id}`}>
          <h3 className="font-display font-semibold text-ink-900 leading-snug line-clamp-2 hover:text-amber-600 transition-colors">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-ink-900/60 line-clamp-2">{course.description}</p>
        <div className="mt-auto pt-2 flex items-center justify-between text-sm">
          <span className="text-ink-900/60">by {course.instructor?.name || 'Instructor'}</span>
          <span className="font-semibold text-ink-900">
            {course.price > 0 ? `$${course.price}` : 'Free'}
          </span>
        </div>
        {footer}
      </div>
    </div>
  );
};

export default CourseCard;
