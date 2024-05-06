// videoPlayer.js
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('video-container');
    let currentVideoIndex = 0;
  
    console.log('hello');

    // Listen for clicks on the video container
    videoContainer.addEventListener('ended', function(event) {
        console.log('event ended ', event.target.src);
        // Check if the ended event originated from a video element
      if (event.target.tagName.toLowerCase() === 'video') {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        const video = event.target;
        video.src = videoSources[currentVideoIndex];
        video.play().catch(error => {
          console.error('Failed to play video:', error);
        });
      }
    });

    // Preload the first video
    const video = document.getElementById('background-video');
    video.src = videoSources[currentVideoIndex];
    video.load();

    // Play the video when loaded to avoid the first visible hiccup
    video.oncanplay = () => {
        video.play().catch(error => {
        console.error('Failed to play video:', error);
      });
    };
  
    // Mute the video and hide controls
    video.muted = true;
    video.controls = false;
  });
  