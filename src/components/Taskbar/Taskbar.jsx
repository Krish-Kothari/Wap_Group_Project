import React from 'react';
import styles from './Taskbar.module.css';

const Taskbar = ({ toggleStart }) => {
  const now = new Date();

// const formattedDateTime = now.toLocaleString('en-US', {
//     weekday: 'short',
//     month: 'short',  
//     day: 'numeric',
//     hour: 'numeric',
//     minute: '2-digit',
//     hour12: true        
//   });

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
      <div className={styles.startButton} onClick={toggleStart}>
        <span className={styles.winIcon}>⊞</span>
      </div>
      
      <div className={styles.taskbarIcons}>
        {/* Pinned app placeholders */}
        <div className={styles.taskIcon}>🌐</div>
        <div className={styles.taskIcon}>📁</div>
        <div className={styles.taskIcon}>⚙️</div>
      </div>
      
      <div className={styles.systemTray}>
        <span>{formattedDateTime}</span>
      </div>
    </div>
  );
};

export default Taskbar;