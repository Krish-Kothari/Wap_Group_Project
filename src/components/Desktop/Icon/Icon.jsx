import React from 'react';
import styles from './Icon.module.css';

const Icon = ({ icon, label, onClick }) => {
  return (
    <div className={styles.icon} onClick={onClick} onDoubleClick={onClick}>
      <div className={styles.iconImage}>{icon}</div>
      <span className={styles.iconLabel}>{label}</span>
    </div>
  );
};

export default Icon;