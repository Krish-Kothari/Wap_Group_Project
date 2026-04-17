import React from 'react';
import styles from './YouTubeSidebar.module.css';

const YouTubeSidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '📺', label: 'Shorts' },
    { icon: '📋', label: 'Subscriptions' },
    { icon: '📚', label: 'Library' },
    { icon: '📜', label: 'History' },
    { icon: '⏱️', label: 'Watch Later' },
    { icon: '👍', label: 'Liked Videos' },
  ];

  return (
    <aside className={styles.sidebar}>
      {menuItems.map((item, index) => (
        <div key={index} className={styles.menuItem}>
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default YouTubeSidebar;