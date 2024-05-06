// videoPlayer.js
function videoPlayer(videoSources) {
    const videos = document.querySelectorAll('video');
    let currentVideoIndex = 0;
  
    videos.forEach((video, index) => {
      // Preload the video
      video.src = videoSources[index];
      video.load();
  
      // Play the video when loaded to avoid the first visible hiccup
      video.oncanplay = () => {
        video.play().catch(error => {
          console.error('Failed to play video:', error);
        });
      };
  
      // Listen for the 'ended' event to switch to the next video
      video.addEventListener('ended', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        video.src = videoSources[currentVideoIndex];
        video.play().catch(error => {
          console.error('Failed to play video:', error);
        });
      });
  
      // Mute the video and hide controls
      video.muted = true;
      video.controls = false;
    });
  }
  
  window.videoPlayer = videoPlayer;
  