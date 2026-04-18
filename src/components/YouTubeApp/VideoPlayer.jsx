import React from 'react';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ video }) => {
  const videoUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
  return (
    <div className={styles.playerContainer}>
      <iframe
        className={styles.player}
        src={videoUrl}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className={styles.videoInfo}>
        <h2 className={styles.videoTitle}>{video.title}</h2>
        <div className={styles.channelInfo}>
          <img src={video.channelAvatar} alt={video.channelName} className={styles.channelAvatar} />
          <div className={styles.channelDetails}>
            <p className={styles.channelName}>{video.channelName}</p>
            <p className={styles.subscriberCount}>{video.subscriberCount || '1M subscribers'}</p>
          </div>
          <button className={styles.subscribeBtn}>Subscribe</button>
        </div>
        <div className={styles.videoActions}>
          <button>👍 {video.likeCount || '12K'}</button>
          <button>👎</button>
          <button>↗️ Share</button>
          <button>💾 Save</button>
        </div>
        <div className={styles.description}>
          <p>{video.views} • {video.timestamp}</p>
          <p>{video.description || 'This is a sample video description.'}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;