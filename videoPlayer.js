// videoPlayer.js
function videoPlayer(videoSources) {
    const video = document.getElementById('background-video');
    let currentVideoIndex = 0;
  
    // Preload the first video
    video.src = videoSources[currentVideoIndex];
    video.load();
  
    // Play the video when loaded to avoid the first visible hiccup
    video.oncanplay = () => {
      video.play().catch(error => {
        console.error('Failed to play video:', error);
      });
    };
  
    // Listen for the 'ended' event to switch to the next video
    video.addEventListener('ended', () => {
      console.log('Video ended'); // Check if this message is logged
      currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
      video.src = videoSources[currentVideoIndex];
      video.play().catch(error => {
        console.error('Failed to play video:', error);
      });
    });
  
    // Log whether the 'ended' event listener is added successfully
    console.log('Event listener added successfully:', video.getAttribute('onended') !== null);
  
    // Mute the video and hide controls
    video.muted = true;
    video.controls = false;
  }
  
  window.videoPlayer = videoPlayer;
  