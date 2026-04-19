import React from 'react';
import VideoCard from './VideoCard';
import { mockVideos } from '../../utils/youtubeMockData';
import styles from './VideoGrid.module.css';

const VideoGrid = () => {
  const VideoGrid = ({ videos, onVideoClick }) => {
  return (
    <div className={styles.grid}>
      {videos.map(video => (
        <VideoCard key={video.id} video={video} onClick={onVideoClick} />
      ))}
    </div>
  );
};
  return (
    <div className={styles.grid}>
      {mockVideos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;