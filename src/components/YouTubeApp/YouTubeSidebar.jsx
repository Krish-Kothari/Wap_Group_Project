import React from 'react';
import styles from './YouTubeSidebar.module.css';
import homeIcon from '../../assets/home.png';

const YouTubeSidebar = () => {
  const menuItems = [
    { icon: <img src={homeIcon} alt="Home" className={styles.iconImage} />, label: 'Home' },
    { icon: '📺', label: 'Shorts' },
    { icon: '📋', label: 'Subscriptions' },
    { icon: '📚', label: 'Library' },
    { icon: '📜', label: 'History' },
    { icon: '⏱️', label: 'Watch Later' },
    { icon: '👍', label: 'Liked Videos' },
  ];

  return (
    <aside className={styles.sidebar}>
      {menuItems.map((item) => (
        <div key={item.label} className={styles.menuItem}>
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default YouTubeSidebar;