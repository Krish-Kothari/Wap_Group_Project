import React, { useEffect, useRef } from 'react';
import styles from './StartMenu.module.css';

const StartMenu = ({ closeStart }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeStart();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeStart]);

  return (
    <div className={styles.startMenu} ref={menuRef}>
      <div className={styles.searchBox}>
        <span>🔍</span>
        <input type="text" placeholder="Type here to search" />
      </div>
      
      <div className={styles.pinnedApps}>
        <div className={styles.appTile}>📁 File Explorer</div>
        <div className={styles.appTile}>🌐 Edge</div>
        <div className={styles.appTile}>⚙️ Settings</div>
      </div>
      
      <div className={styles.recommended}>
        <span>Recommended</span>
        <div>📄 Document.docx</div>
        <div>🖼️ Picture.png</div>
      </div>
      
      <div className={styles.userSection}>
        <span>👤 User</span>
      </div>
    </div>
  );
};

export default StartMenu;