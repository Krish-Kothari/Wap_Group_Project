import React from 'react';
import styles from './YouTubeHeader.module.css';
import ytIcon from '../../assets/ytIcon.png';
import searchIcon from '../../assets/search.png';

const YouTubeHeader = ({ onLogoClick, searchQuery, onSearchChange, onSearchSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
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
  );
};

export default YouTubeHeader;