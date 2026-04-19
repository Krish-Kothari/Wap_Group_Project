import React from 'react';
import VideoCard from './VideoCard';
import styles from './RecommendedVideos.module.css';

const RecommendedVideos = ({ videos, onVideoClick }) => {
  return (
    <div className={styles.recommended}>
      <h3 className={styles.heading}>Recommended</h3>
      <div className={styles.list}>
        {videos.map(video => (
          <div key={video.id} onClick={() => onVideoClick(video)}>
            <VideoCard video={video} compact />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedVideos;