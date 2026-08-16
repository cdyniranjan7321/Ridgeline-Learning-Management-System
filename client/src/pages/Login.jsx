import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      const dest = location.state?.from || (user.role === 'student' ? '/student' : '/instructor');
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to log in. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials for testing
  const demoCredentials = [
    { role: 'Student', email: 'student@example.com', password: 'password123' },
    { role: 'Instructor', email: 'instructor@example.com', password: 'password123' },
    { role: 'Admin', email: 'admin@example.com', password: 'password123' },
  ];

  const fillDemoCredentials = (email, password) => {
    setForm({ email, password });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl text-white font-bold">R</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Log in to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="text-red-500 text-lg">⚠️</span>
                <div>
                  <p className="text-red-700 text-sm font-medium">Login Failed</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </span>
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚀 Log In
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xl">🔵</span>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xl">⚫</span>
              <span className="text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-3">
            🧪 Demo Accounts
          </p>
          <div className="grid grid-cols-3 gap-2">
            {demoCredentials.map((demo, index) => (
              <button
                key={index}
                onClick={() => fillDemoCredentials(demo.email, demo.password)}
                className="p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors text-center group"
              >
                <p className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {demo.role}
                </p>
                <p className="text-[10px] text-gray-400 truncate">{demo.email}</p>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Click on any role to auto-fill credentials
          </p>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline"
          >
            Create an account
          </Link>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link 
            to="/" 
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;