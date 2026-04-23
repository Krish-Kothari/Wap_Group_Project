import React from 'react';
import styles from './Icon.module.css';

const Icon = ({ icon, label, name, onClick, href }) => {
  const iconLabel = label || name;

  const content = (
    <>
      <div className={styles.iconImage}>{icon}</div>
      <span className={styles.iconLabel}>{iconLabel}</span>
    </>
  );

  if (href) {
    return (
      <a className={styles.icon} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <div className={styles.icon} onClick={onClick} onDoubleClick={onClick}>
      {content}
    </div>
  );
};

export default Icon;