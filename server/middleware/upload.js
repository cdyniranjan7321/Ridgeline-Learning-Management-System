const multer = require('multer');
const path = require('path');
const fs = require('fs');

const videoDir = path.join(__dirname, '..', 'uploads', 'videos');
const thumbDir = path.join(__dirname, '..', 'uploads', 'thumbnails');
[videoDir, thumbDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') cb(null, videoDir);
    else if (file.fieldname === 'thumbnail') cb(null, thumbDir);
    else cb(new Error('Unexpected field'), null);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'video') {
    const allowed = ['.mp4', '.webm', '.ogg', '.mov', '.mkv'];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error('Only video files (mp4, webm, ogg, mov, mkv) are allowed'));
    }
  }
  if (file.fieldname === 'thumbnail') {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error('Only image files (jpg, png, webp) are allowed for thumbnails'));
    }
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max per video
});

module.exports = upload;
