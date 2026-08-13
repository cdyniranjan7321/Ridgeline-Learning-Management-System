import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'General',
    level: 'Beginner',
    price: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/courses', form);
      navigate(`/instructor/courses/${res.data.course._id}/manage`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-display font-bold text-ink-900 mb-1">Create a new course</h1>
      <p className="text-ink-900/60 mb-8">
        Start with the basics — you can add video lessons right after.
      </p>

      <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <div>
          <label className="label">Course title</label>
          <input
            required
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Introduction to React"
          />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            required
            rows={5}
            className="input"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What will students learn in this course?"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Category</label>
            <input
              className="input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Programming"
            />
          </div>
          <div>
            <label className="label">Level</label>
            <select
              className="input"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Price (USD, 0 for free)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="input"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? 'Creating…' : 'Create course & add lessons'}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
