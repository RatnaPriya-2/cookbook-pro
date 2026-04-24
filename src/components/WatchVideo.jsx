import React from "react";

const WatchVideo = ({ videoUrl, setVideoUrl, isOpen, setIsOpen }) => {
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  if (!videoId) return null;
  return (
    <>
      <div className={`video-main-body ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => {
          setIsOpen(!isOpen)
          setVideoUrl("")
        }}>
          ✖
        </button>
        <iframe title="Watch-recipe"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-btn-primary video-fallback-btn"
        >
          ▶ Watch on YouTube
        </a>

      </div>
    </>
  );
};

export default WatchVideo;
