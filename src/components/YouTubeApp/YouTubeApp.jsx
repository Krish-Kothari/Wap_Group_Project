import React, { useEffect, useState } from 'react';
import YouTubeHeader from './YouTubeHeader';
import YouTubeSidebar from './YouTubeSidebar';
import VideoGrid from './VideoGrid';
import VideoPlayer from './VideoPlayer';
import RecommendedVideos from './RecommendedVideos';
import CommentSection from './CommentSection';
import { mockVideos } from '../../utils/youtubeMockData';
import { fetchTrendingVideos, fetchVideosBySearch } from '../../utils/youtubeApi';
import styles from './YouTubeApp.module.css';

const YouTubeApp = () => {
  const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'watch'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError] = useState('');
  const [usingFallback, setUsingFallback] = useState(!RAPID_API_KEY && !YOUTUBE_API_KEY);
  const [watchHistory, setWatchHistory] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('yt_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [likedVideos, setLikedVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('yt_liked_videos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [videos, setVideos] = useState(mockVideos);
  const [commentsByVideo, setCommentsByVideo] = useState(() => {
    const initial = {};
    mockVideos.forEach((video) => {
      initial[video.id] = video.comments || [];
    });
    return initial;
  });

  useEffect(() => {
    const loadDefaultVideos = async () => {
      if (!RAPID_API_KEY && !YOUTUBE_API_KEY) {
        setUsingFallback(true);
        setApiError('Using sample videos. Add VITE_RAPID_API_KEY (or VITE_YOUTUBE_API_KEY) to load real YouTube videos.');
        return;
      }

      setIsFetching(true);
      setApiError('');

      try {
        const trendingVideos = await fetchTrendingVideos({
          rapidApiKey: RAPID_API_KEY,
          youtubeApiKey: YOUTUBE_API_KEY
        });
        setVideos(trendingVideos);
        setUsingFallback(false);
      } catch (error) {
        setVideos(mockVideos);
        setUsingFallback(true);
        setApiError(`Could not load YouTube videos: ${error.message}. Showing sample videos.`);
      } finally {
        setIsFetching(false);
      }
    };

    loadDefaultVideos();
  }, [RAPID_API_KEY, YOUTUBE_API_KEY]);

  useEffect(() => {
    localStorage.setItem('yt_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem('yt_liked_videos', JSON.stringify(likedVideos));
  }, [likedVideos]);

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

  const sourceVideos =
    activeSection === 'history'
      ? watchHistory
      : activeSection === 'liked'
        ? likedVideos
        : videos;

  const filteredVideos = sourceVideos
    .filter((video) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;

      return (
        video.title.toLowerCase().includes(query) ||
        video.channelName.toLowerCase().includes(query)
      );
    })
    .filter((video) => {
      if (!showLiveOnly && activeSection !== 'live') return true;
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
    setActiveSection('home');
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentView('home');
  };

  const handleSearchSubmit = async (customQuery) => {
    const query = (customQuery ?? searchQuery).trim();

    setCurrentView('home');
    setActiveSection('home');
    setShowLiveOnly(false);
    setApiError('');

    if (!RAPID_API_KEY && !YOUTUBE_API_KEY) {
      setUsingFallback(true);
      setApiError('Using sample videos. Add VITE_RAPID_API_KEY (or VITE_YOUTUBE_API_KEY) to search real YouTube videos.');
      return;
    }

    if (!query) {
      setIsFetching(true);
      try {
        const trendingVideos = await fetchTrendingVideos({
          rapidApiKey: RAPID_API_KEY,
          youtubeApiKey: YOUTUBE_API_KEY
        });
        setVideos(trendingVideos);
      } catch (error) {
        setApiError(`Could not load YouTube videos: ${error.message}`);
      } finally {
        setIsFetching(false);
      }
      return;
    }

    setIsFetching(true);
    try {
      const searchedVideos = await fetchVideosBySearch({
        rapidApiKey: RAPID_API_KEY,
        youtubeApiKey: YOUTUBE_API_KEY,
        query
      });
      setVideos(searchedVideos);
      setRecentSearches((prev) => [query, ...prev.filter((item) => item !== query)].slice(0, 6));
    } catch (error) {
      setApiError(`Search failed: ${error.message}`);
    } finally {
      setIsFetching(false);
    }
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

  const handleClearFilters = () => {
    setSortBy('default');
    setShowLiveOnly(false);
    setSearchQuery('');
    setActiveSection('home');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setCurrentView('home');

    if (section === 'live') {
      setShowLiveOnly(true);
    }

    if (section !== 'live') {
      setShowLiveOnly(false);
    }
  };

  const handleRecentSearchPick = (query) => {
    setSearchQuery(query);
    handleSearchSubmit(query);
  };

  const handleToggleVideoLike = (video, shouldLike) => {
    if (!video) return;

    setLikedVideos((prev) => {
      if (shouldLike) {
        const withoutVideo = prev.filter((item) => item.id !== video.id);
        return [video, ...withoutVideo].slice(0, 20);
      }

      return prev.filter((item) => item.id !== video.id);
    });
  };

  const handlePlayNext = () => {
    if (recommendedVideos.length === 0) return;
    handleVideoClick(recommendedVideos[0]);
  };

  const isSelectedVideoLiked = likedVideos.some((video) => video.id === selectedVideo?.id);

  return (
    <div className={styles.youtubeApp}>
      <YouTubeHeader
        onLogoClick={handleBackToHome}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        recentSearches={recentSearches}
        onRecentSearchPick={handleRecentSearchPick}
        onClearRecentSearches={() => setRecentSearches([])}
      />
      <div className={styles.mainContainer}>
        <YouTubeSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          likedCount={likedVideos.length}
        />
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
              <button className={styles.clearFiltersBtn} onClick={handleClearFilters}>
                Clear filters
              </button>
            </div>

            {usingFallback && (
              <div className={styles.notice}>Sample mode: API key not found or request failed.</div>
            )}

            {apiError && <div className={styles.notice}>{apiError}</div>}

            {isFetching && <div className={styles.notice}>Loading videos...</div>}

            {activeSection === 'history' && watchHistory.length === 0 && (
              <div className={styles.emptyState}>
                <h3>No watch history yet</h3>
                <p>Play a few videos to build your history.</p>
              </div>
            )}

            {activeSection === 'liked' && likedVideos.length === 0 && (
              <div className={styles.emptyState}>
                <h3>No liked videos yet</h3>
                <p>Use the thumbs up button on any video to save it here.</p>
              </div>
            )}

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

            {!isFetching && visibleVideos.length > 0 ? (
              <VideoGrid videos={visibleVideos} onVideoClick={handleVideoClick} />
            ) : activeSection === 'history' && watchHistory.length === 0 ? null : (
              !isFetching && <div className={styles.emptyState}>
                <h3>No videos found</h3>
                <p>Try another search term.</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.watchContainer}>
            <div className={styles.watchMain}>
              <VideoPlayer
                key={selectedVideo?.id}
                video={selectedVideo}
                isLiked={isSelectedVideoLiked}
                onToggleLike={handleToggleVideoLike}
              />
              <div className={styles.nextControls}>
                <button onClick={handlePlayNext} disabled={recommendedVideos.length === 0}>
                  Play next recommended
                </button>
                <button onClick={() => setIsAutoplayEnabled((prev) => !prev)}>
                  {isAutoplayEnabled ? 'Autoplay: On' : 'Autoplay: Off'}
                </button>
              </div>
              <CommentSection
                comments={commentsByVideo[selectedVideo.id] || []}
                onAddComment={(text) => handleAddComment(selectedVideo.id, text)}
              />
            </div>
            <RecommendedVideos
              videos={isAutoplayEnabled ? recommendedVideos : recommendedVideos.slice(0, 5)}
              onVideoClick={handleVideoClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeApp;