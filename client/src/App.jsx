import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CourseCatalog from './pages/CourseCatalog.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import InstructorDashboard from './pages/InstructorDashboard.jsx';
import CreateCourse from './pages/CreateCourse.jsx';
import ManageCourse from './pages/ManageCourse.jsx';
import NotFound from './pages/NotFound.jsx';
import About from './pages/About.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* New Pages */}
          <Route path="/about" element={<About />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute roles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor"
            element={
              <ProtectedRoute roles={['instructor', 'admin']}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/courses/new"
            element={
              <ProtectedRoute roles={['instructor', 'admin']}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/courses/:id/manage"
            element={
              <ProtectedRoute roles={['instructor', 'admin']}>
                <ManageCourse />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
