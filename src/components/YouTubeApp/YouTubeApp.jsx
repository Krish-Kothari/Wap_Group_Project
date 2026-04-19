import React, { useState } from 'react';
import YouTubeHeader from './YouTubeHeader';
import YouTubeSidebar from './YouTubeSidebar';
import VideoGrid from './VideoGrid';
import VideoPlayer from './VideoPlayer';
import RecommendedVideos from './RecommendedVideos';
import CommentSection from './CommentSection';
import { mockVideos } from '../../utils/youtubeMockData';
import styles from './YouTubeApp.module.css';

const YouTubeApp = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'watch'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos] = useState(mockVideos);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setCurrentView('watch');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedVideo(null);
  };

  return (
    <div className={styles.youtubeApp}>
      <YouTubeHeader onLogoClick={handleBackToHome} />
      <div className={styles.mainContainer}>
        <YouTubeSidebar />
        {currentView === 'home' ? (
          <div className={styles.content}>
            <VideoGrid videos={videos} onVideoClick={handleVideoClick} />
          </div>
        ) : (
          <div className={styles.watchContainer}>
            <div className={styles.watchMain}>
              <VideoPlayer video={selectedVideo} />
              <CommentSection comments={selectedVideo?.comments || []} />
            </div>
            <RecommendedVideos videos={videos.filter(v => v.id !== selectedVideo?.id)} onVideoClick={handleVideoClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeApp;