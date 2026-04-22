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
  const [searchQuery, setSearchQuery] = useState('');
  const [videos] = useState(mockVideos);

  const filteredVideos = videos.filter((video) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      video.title.toLowerCase().includes(query) ||
      video.channelName.toLowerCase().includes(query)
    );
  });

  const recommendedVideos =
    filteredVideos.filter((v) => v.id !== selectedVideo?.id).length > 0
      ? filteredVideos.filter((v) => v.id !== selectedVideo?.id)
      : videos.filter((v) => v.id !== selectedVideo?.id);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setCurrentView('watch');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedVideo(null);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentView('home');
  };

  return (
    <div className={styles.youtubeApp}>
      <YouTubeHeader
        onLogoClick={handleBackToHome}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div className={styles.mainContainer}>
        <YouTubeSidebar />
        {currentView === 'home' || !selectedVideo ? (
          <div className={styles.content}>
            {filteredVideos.length > 0 ? (
              <VideoGrid videos={filteredVideos} onVideoClick={handleVideoClick} />
            ) : (
              <div className={styles.emptyState}>
                <h3>No videos found</h3>
                <p>Try another search term.</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.watchContainer}>
            <div className={styles.watchMain}>
              <VideoPlayer key={selectedVideo?.id} video={selectedVideo} />
              <CommentSection comments={selectedVideo?.comments || []} />
            </div>
            <RecommendedVideos
              videos={recommendedVideos}
              onVideoClick={handleVideoClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeApp;