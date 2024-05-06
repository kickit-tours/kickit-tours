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
  
    const playNextVideo = () => {
      if (currentSourceIndex >= videoSources.length) {
        currentSourceIndex = 0; // Loop back to the first video
      }
      
      video.src = videoSources[currentSourceIndex];
      video.muted = true; // Mute the video
      video.play().catch(error => {
        console.error('Failed to play video:', error);
      });
  
      // Preload the next video
      const nextSourceIndex = (currentSourceIndex + 1) % videoSources.length;
      nextVideo.src = videoSources[nextSourceIndex];
      nextVideo.load();
      
      currentSourceIndex++;
  
      // Crossfade transition
      video.style.transition = 'opacity 1s ease-out';
      video.style.opacity = 1;
      nextVideo.style.transition = 'opacity 1s ease-out';
      nextVideo.style.opacity = 0;
  
      setTimeout(() => {
        video.style.opacity = 0;
        nextVideo.style.opacity = 1;
      }, 1000); // Crossfade duration
    };
  
    // Play the first video
    playNextVideo();
  
    // Listen for the 'ended' event to play the next video
    video.addEventListener('ended', playNextVideo);
  };
  
  window.videoPlayer = videoPlayer;
  