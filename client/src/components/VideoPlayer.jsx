import React, { useRef } from 'react';

// Streams video from the backend's range-enabled endpoint. The <video> tag natively
// issues Range requests, which server/controllers/videoController.js honors for seeking.
const VideoPlayer = ({ courseId, lessonId, onEnded, title }) => {
  const videoRef = useRef(null);
  const token = localStorage.getItem('lms_token');

  // We can't set auth headers on a plain <video src>, so we pass the token as a query param
  // and the streaming route also accepts it there as a fallback to the Authorization header.
  const src = `/api/videos/stream/${courseId}/${lessonId}?token=${encodeURIComponent(token || '')}`;

  return (
    <div className="w-full bg-ink-950 rounded-xl2 overflow-hidden shadow-card">
      <video
        ref={videoRef}
        key={lessonId}
        src={src}
        controls
        controlsList="nodownload"
        className="w-full aspect-video bg-black"
        onEnded={onEnded}
      >
        Your browser does not support video playback.
      </video>
      {title && <div className="px-4 py-3 text-sm text-parchment-100 font-medium">{title}</div>}
    </div>
  );
};

export default VideoPlayer;
