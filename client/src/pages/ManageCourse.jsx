import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios.js';

const ManageCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [lessonForm, setLessonForm] = useState({ title: '', description: '', duration: '', file: null });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [thumbFile, setThumbFile] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data.course);
      const rosterRes = await api.get(`/enrollments/course/${id}/roster`);
      setRoster(rosterRes.data.enrollments);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const updateField = (field, value) => setCourse((c) => ({ ...c, [field]: value }));

  const saveDetails = async () => {
    setSaving(true);
    setMessage('');
    try {
      const { title, description, category, level, price } = course;
      const res = await api.put(`/courses/${id}`, { title, description, category, level, price });
      setCourse(res.data.course);
      setMessage('Course details saved.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async () => {
    const res = await api.put(`/courses/${id}`, { published: !course.published });
    setCourse(res.data.course);
  };

  const uploadThumbnail = async () => {
    if (!thumbFile) return;
    const fd = new FormData();
    fd.append('thumbnail', thumbFile);
    const res = await api.post(`/courses/${id}/thumbnail`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setCourse(res.data.course);
    setThumbFile(null);
  };

  const uploadLesson = async (e) => {
    e.preventDefault();
    if (!lessonForm.file || !lessonForm.title) return;
    setUploading(true);
    setUploadProgress(0);
    const fd = new FormData();
    fd.append('title', lessonForm.title);
    fd.append('description', lessonForm.description);
    fd.append('duration', lessonForm.duration || 0);
    fd.append('video', lessonForm.file);

    try {
      const res = await api.post(`/courses/${id}/lessons`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => {
          setUploadProgress(Math.round((evt.loaded * 100) / evt.total));
        },
      });
      setCourse(res.data.course);
      setLessonForm({ title: '', description: '', duration: '', file: null });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Video upload failed.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!confirm('Delete this lesson? This cannot be undone.')) return;
    const res = await api.delete(`/courses/${id}/lessons/${lessonId}`);
    setCourse(res.data.course);
  };

  const deleteCourse = async () => {
    if (!confirm('Delete this entire course and all its videos? This cannot be undone.')) return;
    await api.delete(`/courses/${id}`);
    window.location.href = '/instructor';
  };

  if (loading || !course) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-ink-900/15 border-t-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/instructor" className="text-sm text-ink-900/50 hover:text-ink-900">
            ← Back to studio
          </Link>
          <h1 className="text-2xl font-display font-bold text-ink-900 mt-1">Manage: {course.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge ${course.published ? 'bg-moss-500/10 text-moss-600' : 'bg-ink-900/8 text-ink-900/60'}`}>
            {course.published ? 'Published' : 'Draft'}
          </span>
          <button onClick={togglePublish} className="btn-outline">
            {course.published ? 'Unpublish' : 'Publish'}
          </button>
          <Link to={`/courses/${id}`} className="btn-outline">
            Preview
          </Link>
        </div>
      </div>

      {message && <div className="bg-amber-500/10 text-amber-700 text-sm rounded-lg px-3 py-2">{message}</div>}

      {/* Course details */}
      <div className="card p-6 space-y-4">
        <h2 className="font-display font-semibold text-ink-900">Course details</h2>
        <div>
          <label className="label">Title</label>
          <input className="input" value={course.title} onChange={(e) => updateField('title', e.target.value)} />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            rows={4}
            className="input"
            value={course.description}
            onChange={(e) => updateField('description', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Category</label>
            <input className="input" value={course.category} onChange={(e) => updateField('category', e.target.value)} />
          </div>
          <div>
            <label className="label">Level</label>
            <select className="input" value={course.level} onChange={(e) => updateField('level', e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="label">Price (USD)</label>
            <input
              type="number"
              min="0"
              className="input"
              value={course.price}
              onChange={(e) => updateField('price', Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => setThumbFile(e.target.files[0])} className="text-sm" />
          <button onClick={uploadThumbnail} disabled={!thumbFile} className="btn-outline !py-2">
            Upload thumbnail
          </button>
        </div>
        <div className="flex justify-end">
          <button onClick={saveDetails} disabled={saving} className="btn-primary">
            {saving ? 'Saving…' : 'Save details'}
          </button>
        </div>
      </div>

      {/* Lessons */}
      <div className="card p-6 space-y-5">
        <h2 className="font-display font-semibold text-ink-900">Lessons ({course.lessons.length})</h2>

        <ul className="divide-y divide-ink-900/8">
          {course.lessons.map((lesson, idx) => (
            <li key={lesson._id} className="py-3 flex items-center gap-3">
              <span className="h-7 w-7 rounded-full bg-ink-900/8 text-ink-900/60 text-xs font-semibold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink-900 truncate">{lesson.title}</p>
                {lesson.description && <p className="text-xs text-ink-900/50 truncate">{lesson.description}</p>}
              </div>
              <button onClick={() => deleteLesson(lesson._id)} className="text-sm font-semibold text-red-600 hover:underline shrink-0">
                Delete
              </button>
            </li>
          ))}
          {course.lessons.length === 0 && (
            <li className="py-6 text-center text-sm text-ink-900/40">No lessons yet — add your first below.</li>
          )}
        </ul>

        <form onSubmit={uploadLesson} className="border-t border-ink-900/8 pt-5 space-y-3">
          <h3 className="text-sm font-semibold text-ink-900">Add a new lesson</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              className="input"
              placeholder="Lesson title"
              required
              value={lessonForm.title}
              onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
            />
            <input
              type="number"
              className="input"
              placeholder="Duration (seconds, optional)"
              value={lessonForm.duration}
              onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
            />
          </div>
          <textarea
            className="input"
            rows={2}
            placeholder="Short description (optional)"
            value={lessonForm.description}
            onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
          />
          <input
            type="file"
            accept="video/*"
            required
            onChange={(e) => setLessonForm({ ...lessonForm, file: e.target.files[0] })}
            className="text-sm"
          />

          {uploading && (
            <div className="h-2 rounded-full bg-ink-900/8 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <button type="submit" disabled={uploading} className="btn-accent">
            {uploading ? `Uploading… ${uploadProgress}%` : 'Upload lesson video'}
          </button>
        </form>
      </div>

      {/* Roster */}
      <div className="card p-6 space-y-4">
        <h2 className="font-display font-semibold text-ink-900">Enrolled students ({roster.length})</h2>
        {roster.length === 0 ? (
          <p className="text-sm text-ink-900/50">No one has enrolled yet.</p>
        ) : (
          <ul className="divide-y divide-ink-900/8">
            {roster.map((enr) => (
              <li key={enr._id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-ink-900">{enr.student.name}</p>
                  <p className="text-xs text-ink-900/50">{enr.student.email}</p>
                </div>
                <div className="flex items-center gap-2 w-32">
                  <div className="h-2 flex-1 rounded-full bg-ink-900/8 overflow-hidden">
                    <div className="h-full bg-moss-500 rounded-full" style={{ width: `${enr.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-ink-900/60 w-9 text-right">{enr.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card p-6 border-red-200">
        <h2 className="font-display font-semibold text-red-700 mb-2">Danger zone</h2>
        <p className="text-sm text-ink-900/60 mb-3">
          Deleting this course removes it and all uploaded videos permanently.
        </p>
        <button onClick={deleteCourse} className="btn-danger">
          Delete course
        </button>
      </div>
    </div>
  );
};

export default ManageCourse;
