import './VideoBackground.css'; // Import your CSS file for styling

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
  