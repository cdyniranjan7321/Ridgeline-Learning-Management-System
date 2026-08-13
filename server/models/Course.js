const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    videoFilename: { type: String, default: '' },
    duration: { type: Number, default: 0 }, // seconds
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, default: 'General' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    thumbnail: { type: String, default: '' },
    price: { type: Number, default: 0 },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessons: [lessonSchema],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

courseSchema.virtual('totalDuration').get(function () {
  return this.lessons.reduce((sum, l) => sum + (l.duration || 0), 0);
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
