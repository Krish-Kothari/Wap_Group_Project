import React from 'react';
import VideoCard from './VideoCard';
import styles from './VideoGrid.module.css';

const VideoGrid = ({ videos, onVideoClick }) => {
  return (
    <div className={styles.grid}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onClick={onVideoClick} />
      ))}
    </div>
  );
};

export default VideoGrid;