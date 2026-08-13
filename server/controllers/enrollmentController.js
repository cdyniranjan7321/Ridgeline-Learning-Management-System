const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @route POST /api/enrollments/:courseId  (student enrolls in a course)
exports.enroll = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.published) return res.status(400).json({ message: 'This course is not published yet' });

    const existing = await Enrollment.findOne({ student: req.user._id, course: course._id });
    if (existing) return res.status(400).json({ message: 'You are already enrolled in this course' });

    const enrollment = await Enrollment.create({ student: req.user._id, course: course._id });
    res.status(201).json({ enrollment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to enroll', error: err.message });
  }
};

// @route GET /api/enrollments/mine  (student's enrolled courses + progress)
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({
        path: 'course',
        select: '-lessons.videoUrl',
        populate: { path: 'instructor', select: 'name' },
      })
      .sort({ createdAt: -1 });
    res.json({ enrollments });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch enrollments', error: err.message });
  }
};

// @route GET /api/enrollments/course/:courseId  (check if current student is enrolled + progress)
exports.getEnrollmentForCourse = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: req.params.courseId });
    res.json({ enrollment: enrollment || null });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch enrollment', error: err.message });
  }
};

// @route PUT /api/enrollments/:courseId/progress  (mark a lesson complete / update progress)
exports.updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollment = await Enrollment.findOne({ student: req.user._id, course: course._id });
    if (!enrollment) return res.status(404).json({ message: 'You are not enrolled in this course' });

    if (lessonId && !enrollment.completedLessons.some((id) => id.toString() === lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }
    if (lessonId) enrollment.lastAccessedLesson = lessonId;

    const totalLessons = course.lessons.length || 1;
    enrollment.progress = Math.min(
      100,
      Math.round((enrollment.completedLessons.length / totalLessons) * 100)
    );
    enrollment.completed = enrollment.progress >= 100;

    await enrollment.save();
    res.json({ enrollment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update progress', error: err.message });
  }
};

// @route GET /api/enrollments/course/:courseId/roster  (instructor: list of enrolled students + progress)
exports.getCourseRoster = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not own this course' });
    }

    const enrollments = await Enrollment.find({ course: course._id })
      .populate('student', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json({ enrollments });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch roster', error: err.message });
  }
};
