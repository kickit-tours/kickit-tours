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
  
    const playNextVideo = () => {
      if (currentSourceIndex >= videoSources.length) {
        currentSourceIndex = 0; // Loop back to the first video
      }
      
      video.src = videoSources[currentSourceIndex];
      video.muted = true; // Mute the video
      video.load(); // Load the current video
  
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
      
      currentSourceIndex++;
  
      // Crossfade transition
      video.style.transition = 'opacity 0.1s ease-out';
      video.style.opacity = 1;
      nextVideo.style.transition = 'opacity 0.1s ease-out';
      nextVideo.style.opacity = 0;
  
      setTimeout(() => {
        nextVideo.style.opacity = 1;
      }, 50); // Start showing next video halfway through the transition
  
      setTimeout(() => {
        // Swap videos
        [video.src, nextVideo.src] = [nextVideo.src, video.src];
        [video.style.opacity, nextVideo.style.opacity] = [nextVideo.style.opacity, 0];
        // Reset next video opacity for the next transition
        nextVideo.style.opacity = 0;
      }, 100); // Crossfade duration
    };
  
    // Play the first video
    playNextVideo();
  
    // Listen for the 'ended' event to play the next video
    video.addEventListener('ended', playNextVideo);
  };
  
  window.videoPlayer = videoPlayer;
  