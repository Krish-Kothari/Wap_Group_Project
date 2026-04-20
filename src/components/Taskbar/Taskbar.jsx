import React from 'react';
import styles from './Taskbar.module.css';
import searchIcon from '../../assets/search.png';
import homeIcon from '../../assets/home.png';
import edgeIcon from '../../assets/edge.png';
import explorerIcon from '../../assets/explorer.png';
import settingsIcon from '../../assets/settings.png';

const Taskbar = ({ toggleStart }) => {
  const now = new Date();

  const formattedDateTime = [
    now.toLocaleDateString('en-US', { weekday: 'short' }),
    now.toLocaleDateString('en-US', { month: 'short' }),
    now.toLocaleDateString('en-US', { day: 'numeric' }),
    now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  ].join(' ')

  return (
    <div className={styles.taskbar}>
      <div className={styles.taskbarCenter}>
        <button className={styles.startButton} onClick={toggleStart} aria-label="Start">
          <span className={styles.winIcon}><img src={homeIcon} alt="Home" className={styles.taskIconImage} /></span>
        </button>

        <div className={styles.taskbarIcons}>
          <div className={styles.taskIcon}><img src={searchIcon} alt="Search" className={styles.taskIconImage} /></div>
          <div className={styles.taskIcon}><img src={edgeIcon} alt="Edge" className={styles.taskIconImage} /></div>
          <div className={styles.taskIcon}><img src={explorerIcon} alt="Explorer" className={styles.taskIconImage} /></div>
          <div className={styles.taskIcon}><img src={settingsIcon} alt="Settings" className={styles.taskIconImage} /></div>
        </div>
      </div>
      
      <div className={styles.systemTray}>
        <span>{formattedDateTime}</span>
      </div>
    </div>
  );
};

export default Taskbar;