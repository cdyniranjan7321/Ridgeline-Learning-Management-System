const express = require('express');
const router = express.Router();
const { studentDashboard, instructorDashboard } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

router.get('/student', protect, authorize('student'), studentDashboard);
router.get('/instructor', protect, authorize('instructor', 'admin'), instructorDashboard);

module.exports = router;
