const fs = require('fs');
const path = require('path');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @route GET /api/videos/stream/:courseId/:lessonId
// Streams video with HTTP range support (seeking) and enforces enrollment/ownership access.
exports.streamVideo = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const lesson = course.lessons.id(lessonId);
    if (!lesson || !lesson.videoFilename) {
      return res.status(404).json({ message: 'Lesson video not found' });
    }

    // Access control: owning instructor, admin, or enrolled student
    const isOwner = req.user && course.instructor.equals(req.user._id);
    const isAdmin = req.user && req.user.role === 'admin';
    let isEnrolled = false;
    if (req.user && req.user.role === 'student') {
      const enrollment = await Enrollment.findOne({ student: req.user._id, course: course._id });
      isEnrolled = !!enrollment;
    }

    if (!isOwner && !isAdmin && !isEnrolled) {
      return res.status(403).json({ message: 'Enroll in this course to watch this video' });
    }

    const videoPath = path.join(__dirname, '..', 'uploads', 'videos', lesson.videoFilename);
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ message: 'Video file missing on server' });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    const ext = path.extname(videoPath).slice(1);
    const contentType = `video/${ext === 'mov' ? 'quicktime' : ext}`;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const fileStream = fs.createReadStream(videoPath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
      });
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to stream video', error: err.message });
  }
};
