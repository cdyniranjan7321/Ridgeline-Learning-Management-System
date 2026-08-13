const express = require('express');
const router = express.Router();
const {
  getCourses,
  getMyCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadThumbnail,
  addLesson,
  deleteLesson,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public / general
router.get('/', getCourses);
router.get('/mine', protect, authorize('instructor', 'admin'), getMyCourses);
router.get('/:id', (req, res, next) => {
  // optional auth: attach user if token present, but don't require it
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) return protect(req, res, next);
  next();
}, getCourseById);

// Instructor course management
router.post('/', protect, authorize('instructor', 'admin'), createCourse);
router.put('/:id', protect, authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteCourse);
router.post(
  '/:id/thumbnail',
  protect,
  authorize('instructor', 'admin'),
  upload.single('thumbnail'),
  uploadThumbnail
);

// Lessons (video upload)
router.post(
  '/:id/lessons',
  protect,
  authorize('instructor', 'admin'),
  upload.single('video'),
  addLesson
);
router.delete('/:id/lessons/:lessonId', protect, authorize('instructor', 'admin'), deleteLesson);

module.exports = router;
