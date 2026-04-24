import React from 'react';
import styles from './VideoCard.module.css';

const VideoCard = ({ video, compact = false, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(video);
  };

  return (
    <button
      type="button"
      className={`${styles.card} ${compact ? styles.compact : ''}`}
      onClick={handleClick}
      aria-label={`Play ${video.title}`}
    >
      <div className={styles.thumbnail}>
        <img src={video.thumbnail} alt={video.title} />
        <span className={styles.duration}>{video.duration}</span>
      </div>
      <div className={styles.info}>
        <img className={styles.channelAvatar} src={video.channelAvatar} alt={video.channelName} />
        <div className={styles.details}>
          <h3 className={styles.title}>{video.title}</h3>
          <p className={styles.channelName}>{video.channelName}</p>
          <p className={styles.meta}>{video.views} • {video.timestamp}</p>
        </div>
      </div>
    </button>
  );
};

export default VideoCard;