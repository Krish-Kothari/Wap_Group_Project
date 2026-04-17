import React from 'react';
import VideoCard from './VideoCard';
import { mockVideos } from '../../utils/youtubeMockData';
import styles from './VideoGrid.module.css';

const VideoGrid = () => {
  return (
    <div className={styles.grid}>
      {mockVideos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;