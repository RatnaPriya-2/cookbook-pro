import React, { useEffect } from "react";

const WatchVideo = ({ videoUrl, setVideoUrl, isOpen, setIsOpen }) => {
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setVideoUrl("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen, setVideoUrl]);

  if (!videoId) return null;

  const closeModal = () => {
    setIsOpen(false);
    setVideoUrl("");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="video-backdrop" onClick={closeModal} />}

      <div className={`video-main-body ${isOpen ? "open" : ""}`}>
        {/* Header bar */}
        <div className="video-header">
          <span className="video-header-title">▶ Now Playing</span>
          <button aria-label="Close video" className="close-btn" onClick={closeModal}>
            ✖
          </button>
        </div>

        {/* iframe fills the middle */}
        <iframe
          title="Watch-recipe"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Footer bar — outside the iframe, no overlap */}
        <div className="video-footer">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-yt-link"
          >
            <i className="fa-brands fa-youtube"></i> Open on YouTube
          </a>
        </div>
      </div>
    </>
  );
};

export default WatchVideo;
