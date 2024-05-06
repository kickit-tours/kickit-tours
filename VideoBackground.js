import React from 'react';
import './VideoBackground.css'; // Import your CSS file for styling

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline>
        <source src="./video1.mp4" type="video/mp4" />
        {/* Add additional source elements for different video formats */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBackground;
