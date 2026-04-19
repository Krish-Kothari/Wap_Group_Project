import React from 'react';
import styles from './VideoCard.module.css';

const VideoCard = ({ video }) => {
const VideoCard = ({ video, compact = false, onClick }) => {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ''}`} onClick={() => onClick(video)}>
    </div>
  );
};
  return (
    <div className={styles.card}>
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
    </div>
  );
};

export default VideoCard;