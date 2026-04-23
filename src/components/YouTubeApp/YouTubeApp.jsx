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
  const [sortBy, setSortBy] = useState('default');
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [watchHistory, setWatchHistory] = useState([]);
  const [videos] = useState(mockVideos);
  const [commentsByVideo, setCommentsByVideo] = useState(() => {
    const initial = {};
    mockVideos.forEach((video) => {
      initial[video.id] = video.comments || [];
    });
    return initial;
  });

  const parseViews = (value) => {
    if (!value) return 0;

    const match = value.match(/([\d.]+)\s*([KMB])?/i);
    if (!match) return 0;

    const number = Number.parseFloat(match[1]);
    const unit = match[2]?.toUpperCase();

    if (unit === 'K') return number * 1000;
    if (unit === 'M') return number * 1000000;
    if (unit === 'B') return number * 1000000000;

    return number;
  };

  const filteredVideos = videos
    .filter((video) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;

      return (
        video.title.toLowerCase().includes(query) ||
        video.channelName.toLowerCase().includes(query)
      );
    })
    .filter((video) => {
      if (!showLiveOnly) return true;
      return video.duration === 'LIVE';
    });

  const visibleVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === 'views') {
      return parseViews(b.views) - parseViews(a.views);
    }

    return 0;
  });

  const recommendedVideos =
    visibleVideos.filter((v) => v.id !== selectedVideo?.id).length > 0
      ? visibleVideos.filter((v) => v.id !== selectedVideo?.id)
      : videos.filter((v) => v.id !== selectedVideo?.id);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setCurrentView('watch');

    setWatchHistory((prev) => {
      const deduped = prev.filter((item) => item.id !== video.id);
      return [video, ...deduped].slice(0, 6);
    });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedVideo(null);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentView('home');
  };

  const handleAddComment = (videoId, text) => {
    const newComment = {
      id: `user-${Date.now()}`,
      author: 'You',
      avatar: 'https://i.pravatar.cc/40?img=9',
      time: 'Just now',
      text,
      likes: 0
    };

    setCommentsByVideo((prev) => ({
      ...prev,
      [videoId]: [newComment, ...(prev[videoId] || [])]
    }));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleLiveToggle = () => {
    setShowLiveOnly((prev) => !prev);
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
            <div className={styles.feedTools}>
              <div className={styles.filterGroup}>
                <label htmlFor="sortSelect">Sort by:</label>
                <select id="sortSelect" value={sortBy} onChange={handleSortChange}>
                  <option value="default">Default</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="views">Most viewed</option>
                </select>
              </div>
              <button className={styles.liveToggle} onClick={handleLiveToggle}>
                {showLiveOnly ? 'Showing: Live only' : 'Show Live only'}
              </button>
            </div>

            {watchHistory.length > 0 && (
              <div className={styles.historySection}>
                <div className={styles.historyHeader}>
                  <h3>Recently watched</h3>
                  <button onClick={() => setWatchHistory([])}>Clear</button>
                </div>
                <div className={styles.historyChips}>
                  {watchHistory.map((video) => (
                    <button
                      key={video.id}
                      className={styles.historyChip}
                      onClick={() => handleVideoClick(video)}
                    >
                      {video.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {visibleVideos.length > 0 ? (
              <VideoGrid videos={visibleVideos} onVideoClick={handleVideoClick} />
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
              <CommentSection
                comments={commentsByVideo[selectedVideo.id] || []}
                onAddComment={(text) => handleAddComment(selectedVideo.id, text)}
              />
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