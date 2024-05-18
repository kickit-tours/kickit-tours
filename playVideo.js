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

// Set the video source based on the platform
if (isSafariOniOS()) {
    video.src = mobileVideo; // Use mobile video for mobile devices and Safari on iOS
    video.playbackRate = 4.0;
} else {
    video.src = desktopVideo; // Use desktop video for other platforms
}

// Play the video
video.play();
console.log("Agent", navigator.userAgent);
