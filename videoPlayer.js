// Array of video sources
const videoSources = ["KickitBG1.mp4", "KickitBG2.mp4", "KickitBG3.mp4", "KickitBG4.mp4"];

// Index of the current video
let currentVideoIndex = 0;

// Function to switch to the next video
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    const video = document.getElementById('video');
    video.src = videoSources[currentVideoIndex];
    video.play();
}

// Play the next video when the current one ends
document.getElementById('video').addEventListener('ended', nextVideo);

// Play the first video
nextVideo();
