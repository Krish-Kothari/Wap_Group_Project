import React from 'react';
import YouTubeHeader from './YouTubeHeader';
import YouTubeSidebar from './YouTubeSidebar';
import VideoGrid from './VideoGrid';
import styles from './YouTubeApp.module.css';

const YouTubeApp = () => {
  return (
    <div className={styles.youtubeApp}>
      <YouTubeHeader />
      <div className={styles.mainContainer}>
        <YouTubeSidebar />
        <div className={styles.content}>
          <VideoGrid />
        </div>
      </div>
    </div>
  );
};

export default YouTubeApp;