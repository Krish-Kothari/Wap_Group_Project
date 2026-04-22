import React from 'react';
import VideoCard from './VideoCard';
import styles from './RecommendedVideos.module.css';

const RecommendedVideos = ({ videos, onVideoClick }) => {
  return (
    <div className={styles.recommended}>
      <h3 className={styles.heading}>Recommended</h3>
      <div className={styles.list}>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            compact
            onClick={onVideoClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedVideos;