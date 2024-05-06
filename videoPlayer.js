// videoPlayer.js
const videoPlayer = (videoElementId, videoSource) => {
    const video = document.getElementById(videoElementId);
    if (!video) {
      console.error(`Video element with id ${videoElementId} not found.`);
      return;
    }
  
    video.loop = true;
    video.src = videoSource;
    video.play();
  };
  
  export default videoPlayer;
  