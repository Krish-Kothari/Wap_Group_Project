import React from 'react';
import styles from './YouTubeHeader.module.css';
import ytIcon from '../../assets/ytIcon.png';
import searchIcon from '../../assets/search.png';

const YouTubeHeader = ({ onLogoClick, searchQuery, onSearchChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn}>☰</button>
        <button className={styles.logo} onClick={onLogoClick}>
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
        <button>
          <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        </button>
      </form>
      <div className={styles.right}>
        <button className={styles.iconBtn}>🎥</button>
        <button className={styles.iconBtn}>🔔</button>
        <div className={styles.avatar}>U</div>
      </div>
    </header>
  );
};

export default YouTubeHeader;