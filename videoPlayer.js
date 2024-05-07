// videoPlayer.js
function getPercentProg() {
    var endBuf = video.buffered.end(0);
    var soFar = parseInt(((endBuf / video.duration) * 100));
    document.getElementById("loadStatus").innerHTML =  soFar + '%';
}

function videoPlayer(videoSources) {
    const videos = document.querySelectorAll('.video');
    let currentVideoIndex = 0;
  
    videos.forEach((video, index) => {
        video.src = videoSources[index] + isMobile ? '#t=0.1' : '';
        video.load();

        // Set preload attribute based on device type
        video.preload = isMobile ? 'metadata' : 'auto';

        // Play the video when loaded to avoid the first visible hiccup
        if (video.id === 'video1') {
            video.addEventListener('progress', getPercentProg, false);
            video.addEventListener('canplaythrough', () => {
                video.play().catch(error => {
                  console.error('Failed to play video:', error);
                });
            });
        }
        
        // Listen for the 'timeupdate' event to check if the crossfade should start
        video.addEventListener('timeupdate', () => {
            const duration = video.duration;
            const currentTime = video.currentTime;
            const remainingTime = duration - currentTime;
    
            // Start crossfade just before the end of the current video
            if (remainingTime <= 1.5) { // Adjust this threshold as needed
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
    
    // Preload the second video after the first video has started playing
//    videos[0].addEventListener('playing', () => {
//      if (videos.length > 1) {
//        const secondVideo = videos[1];
//        secondVideo.src = videoSources[1];
//        secondVideo.load();
//      }
//    });

  }
  
  window.videoPlayer = videoPlayer;
  