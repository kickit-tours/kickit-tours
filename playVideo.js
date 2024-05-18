// Get reference to the video element
const video = document.getElementById('video');

// Define video sources for different platforms
const desktopVideo = 'KickitBG-desktop.mp4';
const mobileVideo = 'KickitBG-mobile.mp4';

// Function to detect if the user agent is Safari on iOS
function isSafariOniOS() {
    return /iP(ad|hone|od).+Version\/[\d.]+.*Safari/i.test(navigator.userAgent);
}

// Function to detect if the device is a mobile device
function isMobileDevice() {
    return /Mobi/.test(navigator.userAgent);
}

var rate = 1.0;

// Set the video source based on the platform
if (isSafariOniOS()) {
    video.src = mobileVideo; // Use mobile video for mobile devices and Safari on iOS
    rate = 1.2;
} else {
    video.src = desktopVideo; // Use desktop video for other platforms
    rate = 1.1;
}

video.addEventListener('loadeddata', () => {
    console.log('Video loaded and ready to play');
    if (video.readyState >= 2) { // Ensure video is ready
    video.playbackRate = rate;
    } else {
        console.log('Video not ready');
    }
});


// Play the video
video.play();

console.log("Agent", navigator.userAgent);
