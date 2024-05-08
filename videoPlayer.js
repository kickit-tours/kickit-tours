// Array of video sources
const videoSources = ["KickitBG1.mp4", "KickitBG2.mp4", "KickitBG3.mp4", "KickitBG4.mp4"];

// Index of the current video (initially set to the first element)
let currentVideoIndex = 0;

// Duration from the end of the video to trigger crossfade (in seconds)
const crossfadeDuration = 2; // Adjusted to 2 seconds

// Flag to track whether a crossfade is in progress
let isCrossfadeInProgress = false;

// Flag to track whether it's the first loop
let isFirstLoop = true;

// Flag to track which video is currently playing
let isVideo1Playing = true;

// Get references to the two video elements
const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');

// Play the first video
video1.src = videoSources[currentVideoIndex];
video1.play();

// Function to switch to the next video
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    const nextVideoSrc = videoSources[currentVideoIndex];
    
    if (isVideo1Playing) {
        video2.src = nextVideoSrc;
        video2.play();
    } else {
        video1.src = nextVideoSrc;
        video1.play();
    }
}

// Play the next video with crossfade when the current one is close to ending
function checkCrossfade() {
    const currentVideo = isVideo1Playing ? video1 : video2;
    const currentTime = currentVideo.currentTime;
    const duration = currentVideo.duration;
    const crossfadeStartTime = isFirstLoop ? crossfadeDuration + 1 : crossfadeDuration;

    // Check if crossfade is already in progress or if video is close to ending
    if (!isCrossfadeInProgress && duration - currentTime < crossfadeStartTime) {
        // Set flag to indicate crossfade is in progress
        isCrossfadeInProgress = true;

        // Start crossfade
        if (isVideo1Playing) {
            video1.style.opacity = 0;
            video2.style.opacity = 1;
        } else {
            video2.style.opacity = 0;
            video1.style.opacity = 1;
        }

        // Switch to the next video
        nextVideo();

        // Update which video is currently playing
        isVideo1Playing = !isVideo1Playing;

        // Reset opacity after crossfade duration
        setTimeout(() => {
            video1.style.opacity = isVideo1Playing ? 1 : 0;
            video2.style.opacity = isVideo1Playing ? 0 : 1;
            // Reset flag after crossfade is completed
            isCrossfadeInProgress = false;
        }, crossfadeDuration * 1000); // Convert seconds to milliseconds
    }
}

// Check for crossfade on timeupdate
video1.addEventListener('timeupdate', checkCrossfade);
video2.addEventListener('timeupdate', checkCrossfade);

// After the first loop, set isFirstLoop to false
video1.onended = function() {
    isFirstLoop = false;
};
