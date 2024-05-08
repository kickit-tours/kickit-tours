// Get reference to the video element
const video = document.getElementById('video');

// Define video sources for different platforms
const desktopVideo = 'KickitBG-desktop.mp4';
const mobileVideo = 'KickitBG-mobile.mp4';

// Function to detect if the device is a mobile device
function isMobileDevice() {
    return /Mobi/.test(navigator.userAgent);
}

// Set the video source based on the platform
if (isMobileDevice()) {
    video.src = mobileVideo; // Use mobile video for mobile devices
} else {
    video.src = desktopVideo; // Use desktop video for other platforms
}

// Play the video
video.play();
