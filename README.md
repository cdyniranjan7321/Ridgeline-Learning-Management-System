# Ridgeline — Learning Management System

A full-stack MERN LMS: instructors upload video lessons and track enrollment, students
enroll in courses, stream lessons, and track their own progress. Built with MongoDB,
Express, React, Node.js, and Tailwind CSS. Fully responsive, from phones to widescreen.

## Features

- **Auth & roles** — JWT auth with `student`, `instructor`, and `admin` roles. Registration
  lets you pick student or instructor; role-gated routes and UI on both ends.
- **Video upload & streaming** — Instructors upload lesson videos (Multer, up to 500MB each).
  Playback uses HTTP range requests, so the native `<video>` player can seek instantly
  instead of downloading the whole file first.
- **Course enrollment tracking** — Students enroll, mark lessons complete, and see a
  live progress ring. Instructors see a roster with per-student progress and
  aggregate completion stats per course.
- **Role-based dashboards** — `/student` shows enrolled courses, completion stats, and
  quick continue links. `/instructor` shows a studio view: per-course enrollment counts,
  average completion, and management links.

## Project structure

```
lms/
├── server/            Express API
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/    auth.js (JWT + roles), upload.js (Multer)
│   ├── models/        User, Course (embeds Lesson), Enrollment
│   ├── routes/
│   ├── uploads/        videos/ and thumbnails/ (gitignored, created at runtime)
│   └── server.js
└── client/            React + Vite + Tailwind
    └── src/
        ├── api/axios.js       axios instance with auth interceptor
        ├── context/AuthContext.jsx
        ├── components/        Navbar, CourseCard, VideoPlayer, ProgressRing, etc.
        └── pages/              Home, Login, Register, CourseCatalog, CourseDetail,
                                  StudentDashboard, InstructorDashboard,
                                  CreateCourse, ManageCourse
```

## Prerequisites

- Node.js 18+
- A MongoDB instance — local (`mongod`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI to your database, and change JWT_SECRET to a long random string
npm run dev
```

The API runs on `http://localhost:5000` by default. Health check: `GET /api/health`.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

The app runs on `http://localhost:5173` and proxies `/api` and `/uploads` requests to the
backend (see `vite.config.js`), so no CORS setup is needed in development.

### 3. Try it out

1. Open `http://localhost:5173`, register an **instructor** account.
2. From the instructor studio, click **New course**, fill in the details, then upload
   one or more video lessons on the "Manage course" page. Toggle **Publish** when ready.
3. Register a second account as a **student** (use a different browser/incognito window,
   or log out first).
4. Browse `/courses`, open the course, click **Enroll**, and start streaming lessons —
   mark lessons complete to watch the progress ring fill in.
5. Back in the instructor account, open **Manage course** to see the student appear on
   the roster with live progress.

## Production notes

- Set a strong, random `JWT_SECRET` before deploying.
- Video files are stored on local disk under `server/uploads/videos`; for production at
  scale, swap the Multer disk storage + custom streaming route for an object store
  (S3/Cloudinary/Mux) fronted by signed URLs or a CDN.
- Set `CLIENT_URL` in `server/.env` to your deployed frontend origin so CORS is scoped
  correctly (the code currently allows `*` as a fallback for local development).
- Build the frontend for production with `npm run build` inside `client/`; serve the
  resulting `dist/` folder from your static host or from Express.
