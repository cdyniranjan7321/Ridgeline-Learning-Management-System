const express = require('express');
const router = express.Router();
const {
  enroll,
  getMyEnrollments,
  getEnrollmentForCourse,
  updateProgress,
  getCourseRoster,
} = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/:courseId', protect, authorize('student'), enroll);
router.get('/mine', protect, authorize('student'), getMyEnrollments);
router.get('/course/:courseId', protect, authorize('student'), getEnrollmentForCourse);
router.put('/:courseId/progress', protect, authorize('student'), updateProgress);
router.get('/course/:courseId/roster', protect, authorize('instructor', 'admin'), getCourseRoster);

module.exports = router;
