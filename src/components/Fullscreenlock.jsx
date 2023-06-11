import React, { useEffect } from 'react';

const FullScreenLock = () => {
  const handleFullScreen = () => {
    const element = document.documentElement;
    const requestFullScreen =
      element.requestFullscreen ||
      element.mozRequestFullScreen ||
      element.webkitRequestFullscreen ||
      element.msRequestFullscreen;

    if (requestFullScreen) {
      requestFullScreen.call(element);
    }
  };

  useEffect(() => {
    let fullscreenTimeout;

    handleFullScreen();

    fullscreenTimeout = setTimeout(() => {
      exitFullScreen();
    }, 5000);

    return () => {
      clearTimeout(fullscreenTimeout);
      exitFullScreen();
    };
  }, []);

  const exitFullScreen = () => {
    const exitFullScreen =
      document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;

    if (exitFullScreen) {
      exitFullScreen.call(document);
    }
  };

  return (
    <div>
      <button onClick={handleFullScreen}>Enter Full Screen</button>
      <div>This is a full-screen locked component</div>
    </div>
  );
};

export default FullScreenLock;
