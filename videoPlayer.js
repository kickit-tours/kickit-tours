// videoPlayer.js
function videoPlayer(videoSources) {
    const videos = document.querySelectorAll('.video');
    let currentVideoIndex = 0;
  
    videos.forEach((video, index) => {
      // Preload the video
      video.src = videoSources[index];
      video.load();
  
      // Play the video when loaded to avoid the first visible hiccup
      if (video.id === 'video1') {
        video.play().catch(error => {
            console.error('Failed to play video:', error);
        });
    
//        video.addEventListener('canplay', () => {
//            console.log("First video to play: ",video.src)
//            video.play().catch(error => {
//            console.error('Failed to play video:', error);
//          });
//        });
      }
  
      // Listen for the 'timeupdate' event to check if the crossfade should start
      video.addEventListener('timeupdate', () => {
        const duration = video.duration;
        const currentTime = video.currentTime;
        const remainingTime = duration - currentTime;
  
        // Start crossfade just before the end of the current video
        if (remainingTime <= 3) { // Adjust this threshold as needed
          startCrossfade();
        }
      });
    });
  
    // Mute the videos and hide controls
    videos.forEach(video => {
      video.muted = true;
      video.controls = false;
    });
  
    // Function to start the crossfade between the videos
    function startCrossfade() {
      const currentVideo = videos[currentVideoIndex];
      const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
      const nextVideo = videos[nextVideoIndex];
  
      // Activate the next video to make it visible with transition
      nextVideo.classList.add('active');
  
      // Deactivate the current video to fade it out with transition
      currentVideo.classList.remove('active');
  
      // Play the next video
      nextVideo.play().catch(error => {
        console.error('Failed to play video:', error);
      });
  
      // Switch to the next video after the transition completes
      setTimeout(() => {
        currentVideo.pause();
        currentVideo.currentTime = 0;
        currentVideo.classList.remove('active');
        currentVideoIndex = nextVideoIndex;
      }, 1500); // Adjust this value to match the transition duration
    }
  
    // Start crossfade immediately after the first video starts playing
    videos[0].addEventListener('playing', startCrossfade);
    
  }
  
  window.videoPlayer = videoPlayer;
  