import React from 'react';
import styles from './YouTubeHeader.module.css';

const YouTubeHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn}>☰</button>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>▶️</span>
          <span className={styles.logoText}>YouTube</span>
        </div>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn}>🎥</button>
        <button className={styles.iconBtn}>🔔</button>
        <div className={styles.avatar}>U</div>
      </div>
    </header>
  );
};

export default YouTubeHeader;