import React from 'react';
import styles from './YouTubeSidebar.module.css';
import homeIcon from '../../assets/home.png';

const YouTubeSidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'home', icon: <img src={homeIcon} alt="Home" className={styles.iconImage} />, label: 'Home' },
    { id: 'live', icon: '🔴', label: 'Live' },
    { id: 'history', icon: '🕘', label: 'History' }
  ];

  return (
    <aside className={styles.sidebar}>
      {menuItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.menuItem} ${activeSection === item.id ? styles.active : ''}`}
          onClick={() => onSectionChange(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </aside>
  );
};

export default YouTubeSidebar;