// Array of video sources
const videoSources = ["KickitBG1.mp4", "KickitBG2.mp4", "KickitBG3.mp4", "KickitBG4.mp4"];

// Index of the current video
let currentVideoIndex = videoSources.length-1;

// Duration from the end of the video to trigger crossfade (in seconds)
const crossfadeDuration = 2;

// Function to switch to the next video
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    const video = document.getElementById('video');
    video.src = videoSources[currentVideoIndex];
    video.play();
}

// Play the next video with crossfade when the current one is close to ending
document.getElementById('video').addEventListener('timeupdate', function() {
    const video = this;
    const currentTime = video.currentTime;
    const duration = video.duration;

    // Check if crossfade is already in progress or if video is close to ending
    if (!isCrossfadeInProgress && duration - currentTime < crossfadeDuration) {
        // Set flag to indicate crossfade is in progress
        isCrossfadeInProgress = true;

        // Crossfade when the remaining time is less than crossfadeDuration
        video.style.opacity = 0;
        setTimeout(function() {
            nextVideo();
            video.style.opacity = 1;
            // Reset flag after crossfade is completed
            isCrossfadeInProgress = false;
        }, crossfadeDuration * 1000); // Convert seconds to milliseconds
    }
});

// Play the first video
nextVideo();
