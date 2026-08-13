const express = require('express');
const router = express.Router();
const { streamVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/auth');

router.get('/stream/:courseId/:lessonId', protect, streamVideo);

module.exports = router;
