import React, { useEffect, useRef } from 'react';
import styles from './StartMenu.module.css';
import searchIcon from '../../assets/search.png';
import explorerIcon from '../../assets/explorer.png';
import edgeIcon from '../../assets/edge.png';
import settingsIcon from '../../assets/settings.png';
import ytIcon from '../../assets/ytIcon.png';

const pinnedApps = [
  { label: 'File Explorer', image: explorerIcon, appKey: 'thispc' },
  { label: 'Edge', image: edgeIcon, appKey: 'edge' },
  { label: 'Settings', image: settingsIcon, appKey: 'settings' },
  { label: 'YouTube', image: ytIcon, appKey: 'youtube' },
  { label: '🎮 Games', appKey: 'sps' },
  { label: '🧮 Calculator', appKey: 'calculator' },
  { label: '📝 Todo', appKey: 'todo' },
];

const recommendedItems = ['📄 Document.docx', '🖼️ Picture.png', '📁 Project folder'];

const StartMenu = ({ closeStart, openWindow }) => {
  const menuRef = useRef();

  const handleAppClick = (appKey) => {
    if (appKey && typeof openWindow === 'function') {
      openWindow(appKey);
      closeStart();
    }
  };

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
      <div className={styles.headerRow}>
        <div className={styles.profileChip}>
          <span>👤</span>
          <div>
            <strong>User</strong>
            <span>Local account</span>
          </div>
        </div>
        <button className={styles.powerButton} type="button">⏻</button>
      </div>

      <div className={styles.searchBox}>
        <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        <input type="text" placeholder="Type here to search" />
      </div>
      
      <div className={styles.sectionHeader}>
        <span>Pinned</span>
        <button type="button">All apps</button>
      </div>

      <div className={styles.pinnedApps}>
        {pinnedApps.map((app) => (
          <button
            key={app.label}
            type="button"
            className={styles.appTile}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => handleAppClick(app.appKey)}
          >
            {app.image ? <img src={app.image} alt={app.label} className={styles.appTileIcon} /> : null}
            <span>{app.label}</span>
          </button>
        ))}
      </div>
      
      <div className={styles.recommended}>
        <div className={styles.sectionHeader}>
          <span>Recommended</span>
          <button type="button">More</button>
        </div>
        {recommendedItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default StartMenu;