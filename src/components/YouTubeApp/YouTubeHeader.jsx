import React from 'react';
import styles from './YouTubeHeader.module.css';
import ytIcon from '../../assets/ytIcon.png';
import searchIcon from '../../assets/search.png';

const YouTubeHeader = ({
  onLogoClick,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  recentSearches,
  onRecentSearchPick,
  onClearRecentSearches
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <div className={styles.headerWrap}>
      <header className={styles.header}>
        <div className={styles.left}>
          <button type="button" className={styles.menuBtn}>☰</button>
          <button type="button" className={styles.logo} onClick={onLogoClick}>
            <span className={styles.logoIcon}>
              <img src={ytIcon} alt="YouTube" />
            </span>
            <span className={styles.logoText}>YouTube</span>
          </button>
        </div>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button type="submit" aria-label="Search videos">
            <img src={searchIcon} alt="Search" className={styles.searchIcon} />
          </button>
        </form>
        <div className={styles.right}>
          <button type="button" className={styles.iconBtn}>🎥</button>
          <button type="button" className={styles.iconBtn}>🔔</button>
          <div className={styles.avatar}>U</div>
        </div>
      </header>

      {recentSearches.length > 0 && (
        <div className={styles.recentRow}>
          <span className={styles.recentLabel}>Recent:</span>
          <div className={styles.recentChips}>
            {recentSearches.map((query) => (
              <button
                key={query}
                type="button"
                className={styles.recentChip}
                onClick={() => onRecentSearchPick(query)}
              >
                {query}
              </button>
            ))}
          </div>
          <button type="button" className={styles.clearRecentBtn} onClick={onClearRecentSearches}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

YouTubeHeader.defaultProps = {
  recentSearches: [],
  onRecentSearchPick: () => {},
  onClearRecentSearches: () => {}
};
export default YouTubeHeader;