const GOOGLE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const RAPID_API_BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const RAPID_API_HOST = 'youtube-v31.p.rapidapi.com';

const formatViews = (value) => {
  const number = Number(value || 0);

  return `${new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(number)} views`;
};

const formatRelativeTime = (publishedAt) => {
  const now = Date.now();
  const then = new Date(publishedAt).getTime();
  const diffInSeconds = Math.max(0, Math.floor((now - then) / 1000));

  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value > 0) {
      return `${value} ${unit.label}${value > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

const parseDuration = (isoDuration) => {
  if (!isoDuration) return '0:00';

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const request = async (url, options = {}) => {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    const apiMessage = data?.error?.message || `YouTube API request failed with status ${response.status}`;
    throw new Error(apiMessage);
  }

  return data;
};

const mapVideoItem = (item) => {
  const thumbnail =
    item.snippet?.thumbnails?.high?.url ||
    item.snippet?.thumbnails?.medium?.url ||
    item.snippet?.thumbnails?.default?.url ||
    '';

  const isLive = item.snippet?.liveBroadcastContent === 'live';

  return {
    id: item.id,
    title: item.snippet?.title || 'Untitled video',
    channelName: item.snippet?.channelTitle || 'Unknown channel',
    channelAvatar: `https://i.pravatar.cc/40?u=${encodeURIComponent(item.snippet?.channelId || item.id)}`,
    views: formatViews(item.statistics?.viewCount),
    timestamp: formatRelativeTime(item.snippet?.publishedAt),
    thumbnail,
    duration: isLive ? 'LIVE' : parseDuration(item.contentDetails?.duration),
    description: item.snippet?.description || ''
  };
};

const getVideosByIdsGoogle = async (apiKey, ids) => {
  if (!ids.length) return [];

  const detailsUrl = `${GOOGLE_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${ids.join(',')}&maxResults=24&key=${apiKey}`;
  const detailsData = await request(detailsUrl);

  return (detailsData.items || []).map(mapVideoItem);
};

const getVideosByIdsRapid = async (rapidApiKey, ids) => {
  if (!ids.length) return [];

  const detailsUrl = `${RAPID_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${ids.join(',')}&maxResults=24`;
  const detailsData = await request(detailsUrl, {
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': RAPID_API_HOST
    }
  });

  return (detailsData.items || []).map((item) => {
    const normalizedId = item.id?.videoId || item.id;
    return mapVideoItem({ ...item, id: normalizedId });
  });
};

export const fetchTrendingVideos = async ({ rapidApiKey, youtubeApiKey, maxResults = 24 }) => {
  if (rapidApiKey) {
    const rapidUrl = `${RAPID_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=${maxResults}`;
    const rapidData = await request(rapidUrl, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': RAPID_API_HOST
      }
    });

    return (rapidData.items || []).map((item) => {
      const normalizedId = item.id?.videoId || item.id;
      return mapVideoItem({ ...item, id: normalizedId });
    });
  }

  if (!youtubeApiKey) {
    throw new Error('Missing API key. Set VITE_RAPID_API_KEY or VITE_YOUTUBE_API_KEY.');
  }

  const url = `${GOOGLE_API_BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=${maxResults}&key=${youtubeApiKey}`;
  const data = await request(url);

  return (data.items || []).map(mapVideoItem);
};

export const fetchVideosBySearch = async ({ rapidApiKey, youtubeApiKey, query, maxResults = 24 }) => {
  if (rapidApiKey) {
    const rapidSearchUrl = `${RAPID_API_BASE_URL}/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}`;
    const rapidSearchData = await request(rapidSearchUrl, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': RAPID_API_HOST
      }
    });

    const rapidIds = (rapidSearchData.items || [])
      .map((item) => item.id?.videoId)
      .filter(Boolean);

    return getVideosByIdsRapid(rapidApiKey, rapidIds);
  }

  if (!youtubeApiKey) {
    throw new Error('Missing API key. Set VITE_RAPID_API_KEY or VITE_YOUTUBE_API_KEY.');
  }

  const searchUrl = `${GOOGLE_API_BASE_URL}/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${youtubeApiKey}`;
  const searchData = await request(searchUrl);

  const ids = (searchData.items || [])
    .map((item) => item.id?.videoId)
    .filter(Boolean);

  return getVideosByIdsGoogle(youtubeApiKey, ids);
};