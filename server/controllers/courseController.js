const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const fs = require('fs');
const path = require('path');

// @route GET /api/courses  (public catalog - published only, unless instructor/admin viewing own)
exports.getCourses = async (req, res) => {
  try {
    const { category, level, search } = req.query;
    const filter = { published: true };
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const courses = await Course.find(filter)
      .populate('instructor', 'name email avatar')
      .select('-lessons.videoUrl')
      .sort({ createdAt: -1 });

    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};

// @route GET /api/courses/mine (instructor's own courses, published or not)
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your courses', error: err.message });
  }
};

// @route GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email avatar bio');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // If not published, only the owning instructor or admin can view
    if (!course.published) {
      const isOwner = req.user && course.instructor._id.equals(req.user._id);
      const isAdmin = req.user && req.user.role === 'admin';
      if (!isOwner && !isAdmin) {
        return res.status(403).json({ message: 'This course is not published yet' });
      }
    }

    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch course', error: err.message });
  }
};

// @route POST /api/courses  (instructor only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, level, price } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const course = await Course.create({
      title,
      description,
      category,
      level,
      price: price || 0,
      instructor: req.user._id,
    });
    res.status(201).json({ course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create course', error: err.message });
  }
};

// @route PUT /api/courses/:id (owner instructor or admin)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not own this course' });
    }

    const fields = ['title', 'description', 'category', 'level', 'price', 'published', 'thumbnail'];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) course[f] = req.body[f];
    });

    await course.save();
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update course', error: err.message });
  }
};

// @route DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not own this course' });
    }

    // Clean up video files on disk
    course.lessons.forEach((lesson) => {
      if (lesson.videoFilename) {
        const filePath = path.join(__dirname, '..', 'uploads', 'videos', lesson.videoFilename);
        fs.existsSync(filePath) && fs.unlinkSync(filePath);
      }
    });

    await Enrollment.deleteMany({ course: course._id });
    await course.deleteOne();
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete course', error: err.message });
  }
};

// @route POST /api/courses/:id/thumbnail
exports.uploadThumbnail = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not own this course' });
    }
    if (!req.file) return res.status(400).json({ message: 'No thumbnail file provided' });

    course.thumbnail = `/uploads/thumbnails/${req.file.filename}`;
    await course.save();
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload thumbnail', error: err.message });
  }
};

// @route POST /api/courses/:id/lessons  (upload a video lesson)
exports.addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not own this course' });
    }
    if (!req.file) return res.status(400).json({ message: 'No video file provided' });

    const { title, description, duration } = req.body;
    if (!title) return res.status(400).json({ message: 'Lesson title is required' });

    const lesson = {
      title,
      description: description || '',
      videoUrl: `/uploads/videos/${req.file.filename}`,
      videoFilename: req.file.filename,
      duration: Number(duration) || 0,
      order: course.lessons.length,
    };

    course.lessons.push(lesson);
    await course.save();
    res.status(201).json({ course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add lesson', error: err.message });
  }
};

// @route DELETE /api/courses/:id/lessons/:lessonId
exports.deleteLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not own this course' });
    }

    const lesson = course.lessons.id(req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    if (lesson.videoFilename) {
      const filePath = path.join(__dirname, '..', 'uploads', 'videos', lesson.videoFilename);
      fs.existsSync(filePath) && fs.unlinkSync(filePath);
    }

    lesson.deleteOne();
    await course.save();
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete lesson', error: err.message });
  }
};
