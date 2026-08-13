const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @route GET /api/dashboard/student
exports.studentDashboard = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate({
      path: 'course',
      select: '-lessons.videoUrl',
      populate: { path: 'instructor', select: 'name' },
    });

    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter((e) => e.completed).length;
    const inProgress = totalCourses - completedCourses;
    const avgProgress = totalCourses
      ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / totalCourses)
      : 0;

    res.json({
      stats: { totalCourses, completedCourses, inProgress, avgProgress },
      enrollments,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load student dashboard', error: err.message });
  }
};

// @route GET /api/dashboard/instructor
exports.instructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).select('-lessons.videoUrl');
    const courseIds = courses.map((c) => c._id);

    const enrollments = await Enrollment.find({ course: { $in: courseIds } }).populate(
      'student',
      'name email'
    );

    const totalCourses = courses.length;
    const publishedCourses = courses.filter((c) => c.published).length;
    const totalStudents = new Set(enrollments.map((e) => e.student._id.toString())).size;
    const totalEnrollments = enrollments.length;
    const avgCompletionRate = enrollments.length
      ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
      : 0;

    const perCourseStats = courses.map((course) => {
      const courseEnrollments = enrollments.filter((e) => e.course.toString() === course._id.toString());
      return {
        course: { _id: course._id, title: course.title, thumbnail: course.thumbnail, published: course.published },
        enrolledCount: courseEnrollments.length,
        avgProgress: courseEnrollments.length
          ? Math.round(courseEnrollments.reduce((s, e) => s + e.progress, 0) / courseEnrollments.length)
          : 0,
      };
    });

    res.json({
      stats: { totalCourses, publishedCourses, totalStudents, totalEnrollments, avgCompletionRate },
      perCourseStats,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load instructor dashboard', error: err.message });
  }
};
