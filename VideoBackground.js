import React, { useState, useEffect } from 'react';
import './VideoBackground.css'; // Import your CSS file for styling

const VideoBackground = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = ["./video1.mp4", "./video2.mp4"]; // Replace with your video file paths
  const totalVideos = videos.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % totalVideos);
    }, videos[currentVideoIndex].duration * 1000); // Switch to next video after current video ends

    return () => clearInterval(interval);
  }, [currentVideoIndex, totalVideos, videos]);

  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline>
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        {/* Add additional source elements for different video formats */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBackground;
