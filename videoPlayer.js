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
      console.log("created ",src);

      return video;
    }

    const video = createVideoElement(videoSources[currentVideoIndex]);
  
    // Set preload attribute based on device type
    video.preload = isMobile ? 'none' : 'auto';
    video.classList.add('active');

    // Play the video when enough media has been loaded to play through without interruption
    //video.addEventListener('canplaythrough', () => {
      video.play().catch(error => {
        console.error('Failed to play video:', error);
      });
    //});
  
    // Listen for the 'timeupdate' event to check if the crossfade should start
    video.addEventListener('timeupdate', () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      const remainingTime = duration - currentTime;
  
      // Start crossfade just before the end of the current video
      if (remainingTime <= 1) { // Adjust this threshold as needed
      
        var elementNodeCount = 0;

        for (var i = 0; i < container.childNodes.length; i++) {
            var childNode = container.childNodes[i];            
            // Check if the child node is an element node
            if (childNode.nodeType === 1) {
                elementNodeCount++;
            }
        }
            
        if(elementNodeCount == 1) {
            startCrossfade();
        }
      }
    });
  
    // Function to start the crossfade between the videos
    function startCrossfade() {
      // Create a new video element with the next video source
      const nextVideoIndex = (currentVideoIndex + 1) % videoSources.length;
      const nextVideo = createVideoElement(videoSources[nextVideoIndex]);
      nextVideo.preload = isMobile ? 'none' : 'auto';
      nextVideo.autoplay = false;
  
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
        for (var i = 0; i < container.childNodes.length; i++) {
            var childNode = container.childNodes[i];
            
            // Check if the child node is an element node
            if (childNode.nodeType === 1) {
                // Check if the element has a src attribute
                if (childNode.hasAttribute('src')) {
                    // Get the value of the src attribute
                    var srcValue = childNode.getAttribute('src');
                    console.log(" +++ Source attribute value:", srcValue);
                }
                console.log("remove!");
                container.removeChild(childNode);
                break;
            }
        }
        currentVideoIndex = nextVideoIndex;

        nextVideo.addEventListener('timeupdate', () => {
            const duration = video.duration;
            const currentTime = video.currentTime;
            const remainingTime = duration - currentTime;
    
            // Start crossfade just before the end of the current video
            if (remainingTime <= 1) { // Adjust this threshold as needed
            
            var elementNodeCount = 0;
    
            for (var i = 0; i < container.childNodes.length; i++) {
                var childNode = container.childNodes[i];            
                // Check if the child node is an element node
                if (childNode.nodeType === 1) {
                    elementNodeCount++;
                }
            }
                
            if(elementNodeCount == 1) {
                startCrossfade();
            }
            }
        });
    
      }, 1000); // Adjust this value to match the transition duration
    }
  }
  
  window.videoPlayer = videoPlayer;
  