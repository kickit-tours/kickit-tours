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
  
      // Listen for the 'ended' event of the first video to start the second video
      if (index === 0) {
        video.addEventListener('ended', () => {
          const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
          const nextVideo = videos[nextVideoIndex];
          nextVideo.src = videoSources[nextVideoIndex];
          nextVideo.play().catch(error => {
            console.error('Failed to play video:', error);
          });
          currentVideoIndex = nextVideoIndex;
        });
      }
  
      // Mute the video and hide controls
      video.muted = true;
      video.controls = false;
    });
  }
  
  window.videoPlayer = videoPlayer;
  