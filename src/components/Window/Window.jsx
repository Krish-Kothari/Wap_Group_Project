import React from 'react';
import styles from './Window.module.css';

const Window = ({ title, onClose, children, fullscreen = false }) => {
  return (
    <div className={`${styles.window} ${fullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.titleBar}>
        <span className={styles.title}>{title}</span>
        <div className={styles.windowControls}>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
      </div>
      <div className={`${styles.content} ${fullscreen ? styles.fullscreenContent : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Window;