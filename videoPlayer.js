// videoPlayer.js
function videoPlayer(videoSources, isMobile) {
    const container = document.getElementById('video-container'); // Add a container element in your HTML
    let currentVideoIndex = 0;
  
    function createVideoElement(src) {
      const video = document.createElement('video');
      video.className = 'video';
      video.muted = true;
      video.playsinline = true;
      video.autoplay = true;
      video.src = src;
      container.appendChild(video);
  
      return video;
    }
  
    const video = createVideoElement(videoSources[currentVideoIndex]);
  
    // Set preload attribute based on device type
    video.preload = isMobile ? 'none' : 'auto';
  
    // Play the video when enough media has been loaded to play through without interruption
    video.addEventListener('canplaythrough', () => {
      video.play().catch(error => {
        console.error('Failed to play video:', error);
      });
    });
  
    // Listen for the 'timeupdate' event to check if the crossfade should start
    video.addEventListener('timeupdate', () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      const remainingTime = duration - currentTime;
  
      // Start crossfade just before the end of the current video
      if (remainingTime <= 1) { // Adjust this threshold as needed
        startCrossfade();
      }
    });
  
    // Function to start the crossfade between the videos
    function startCrossfade() {
      // Create a new video element with the next video source
      const nextVideoIndex = (currentVideoIndex + 1) % videoSources.length;
      const nextVideo = createVideoElement(videoSources[nextVideoIndex]);
      nextVideo.preload = isMobile ? 'none' : 'auto';
  
      // Activate the next video to make it visible with transition
      nextVideo.classList.add('active');
  
      // Deactivate the current video to fade it out with transition
      video.classList.remove('active');
  
      // Play the next video
      nextVideo.play().catch(error => {
        console.error('Failed to play video:', error);
      });
  
      // Switch to the next video after the transition completes
      setTimeout(() => {
        video.pause();
        video.currentTime = 0;
        container.removeChild(container.firstChild); // Remove the previous video element
        currentVideoIndex = nextVideoIndex;
      }, 1000); // Adjust this value to match the transition duration
    }
  }
  
  window.videoPlayer = videoPlayer;
  