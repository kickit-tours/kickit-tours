// videoPlayer.js
function videoPlayer(videoSources) {
    const videos = document.querySelectorAll('.video');
    let currentVideoIndex = 0;
    let isFirst = true;

    videos.forEach((video, index) => {
      // Preload the video
      video.src = videoSources[index];
      video.load();
  
      // Play the video when loaded to avoid the first visible hiccup
      if(isFirst) {
        video.oncanplay = () => {
            video.play().catch(error => {
              console.error('Failed to play video:', error);
            });
          };
        isFirst = false;    
      }
  
      // Listen for the 'ended' event to switch to the next video
      video.addEventListener('ended', () => {
        const currentVideo = videos[currentVideoIndex];
        currentVideo.style.opacity = 0;

        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideo = videos[currentVideoIndex];
        nextVideo.src = videoSources[currentVideoIndex];
        nextVideo.style.opacity = 1;
        nextVideo.play().catch(error => {
          console.error('Failed to play video:', error);
        });
      });
    });
  
    // Mute the videos and hide controls
    videos.forEach(video => {
      video.muted = true;
      video.controls = false;
    });
  }
  
  window.videoPlayer = videoPlayer;
  