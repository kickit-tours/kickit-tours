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
    nextVideo.muted = true; // Mute the next video
  
    // Hide video controls
    video.controls = false;
  
    let isFirstPlay = true;
  
    const playNextVideo = () => {
      if (currentSourceIndex >= videoSources.length) {
        currentSourceIndex = 0; // Loop back to the first video
      }
      
      video.src = videoSources[currentSourceIndex];
      video.muted = true; // Mute the video
      video.load(); // Load the current video
  
      // Wait for the 'loadedmetadata' event before playing the video
      video.addEventListener('loadedmetadata', () => {
        // Play the video only if it's not the first time
        if (!isFirstPlay) {
          video.play().catch(error => {
            console.error('Failed to play video:', error);
          });
        } else {
          isFirstPlay = false;
        }
      }, { once: true });
  
      // Preload the next video
      const nextSourceIndex = (currentSourceIndex + 1) % videoSources.length;
      nextVideo.src = videoSources[nextSourceIndex];
      nextVideo.load();
      
      currentSourceIndex++;
    };
  
    // Play the next video
    playNextVideo();
  
    // Listen for the 'ended' event to play the next video
    video.addEventListener('ended', playNextVideo);
  };
  
  window.videoPlayer = videoPlayer;
  