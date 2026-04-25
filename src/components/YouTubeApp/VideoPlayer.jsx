import React, { useEffect, useState } from 'react';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ video, isLiked, onToggleLike }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [reaction, setReaction] = useState(isLiked ? 'like' : null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!video) return undefined;

    const timeout = setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, 12000);

    return () => clearTimeout(timeout);
  }, [video, reloadCount]);

  if (!video) {
    return null;
  }

  const videoUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setReloadCount((prev) => prev + 1);
  };

  const toggleReaction = (type) => {
    setReaction((prev) => {
      const next = prev === type ? null : type;

      if (type === 'like' && onToggleLike) {
        onToggleLike(video, next === 'like');
      }

      if (type === 'dislike' && onToggleLike && prev === 'like') {
        onToggleLike(video, false);
      }

      return next;
    });
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerFrameContainer}>
        {isLoading && !hasError && (
          <div className={styles.loadingState}>Loading video...</div>
        )}

        {hasError ? (
          <div className={styles.errorState}>
            <p>Video failed to load. Please try again.</p>
            <div className={styles.errorActions}>
              <button onClick={handleRetry} className={styles.retryBtn}>Retry</button>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                Open on YouTube
              </a>
            </div>
          </div>
        ) : (
          <iframe
            className={styles.player}
            src={`${videoUrl}&r=${reloadCount}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        )}
      </div>
      <div className={styles.videoInfo}>
        <h2 className={styles.videoTitle}>{video.title}</h2>
        <div className={styles.channelInfo}>
          <img src={video.channelAvatar} alt={video.channelName} className={styles.channelAvatar} />
          <div className={styles.channelDetails}>
            <p className={styles.channelName}>{video.channelName}</p>
            <p className={styles.subscriberCount}>{video.subscriberCount || '1M subscribers'}</p>
          </div>
          <button
            className={`${styles.subscribeBtn} ${isSubscribed ? styles.subscribed : ''}`}
            onClick={() => setIsSubscribed((prev) => !prev)}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
        <div className={styles.videoActions}>
          <button
            className={reaction === 'like' ? styles.activeAction : ''}
            onClick={() => toggleReaction('like')}
          >
            👍 {video.likeCount || '12K'}
          </button>
          <button
            className={reaction === 'dislike' ? styles.activeAction : ''}
            onClick={() => toggleReaction('dislike')}
          >
            👎
          </button>
          <button>↗️ Share</button>
          <button
            className={isSaved ? styles.activeAction : ''}
            onClick={() => setIsSaved((prev) => !prev)}
          >
            💾 {isSaved ? 'Saved' : 'Save'}
          </button>
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