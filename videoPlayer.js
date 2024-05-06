// videoPlayer.js
const videoPlayer = (videoElementId, videoSources) => {
    const video = document.getElementById(videoElementId);
    if (!video) {
      console.error(`Video element with id ${videoElementId} not found.`);
      return;
    }
  
    let currentSourceIndex = 0;
    let nextVideo = document.createElement('video');
    nextVideo.src = videoSources[currentSourceIndex + 1]; // Preload the next video
    nextVideo.muted = true;
  
    // Hide video controls
    const playNextVideo = () => {
      if (currentSourceIndex >= videoSources.length) {
        currentSourceIndex = 0; // Loop back to the first video
      }
      
      video.src = videoSources[currentSourceIndex];
      video.muted = true; // Mute the video
      video.load(); // Load the current video
      video.controls = false;
  
      // Wait for the 'loadedmetadata' event before playing the video
      video.addEventListener('loadedmetadata', () => {
          video.play().catch(error => {
            console.error('Failed to play video:', error);
          });
      }, { once: true });
  
      // Preload the next video
      const nextSourceIndex = (currentSourceIndex + 1) % videoSources.length;
      nextVideo.src = videoSources[nextSourceIndex];
      nextVideo.load();
      nextVideo.muted = true; 
      
      currentSourceIndex++;
    };
  
    // Play the first video
    playNextVideo();
  
    // Listen for the 'ended' event to play the next video
    video.addEventListener('ended', playNextVideo);
  };
  
  window.videoPlayer = videoPlayer;
  