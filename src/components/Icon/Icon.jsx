import React from 'react';
import styles from './Icon.module.css';

const Icon = ({ icon, label, name, onClick, href }) => {
  const iconLabel = label || name;
  const isImageSource =
    typeof icon === 'string' &&
    (/^https?:\/\//i.test(icon) || /^\/.*\.(png|jpe?g|gif|svg|webp)$/i.test(icon));

  const iconNode = isImageSource ? <img src={icon} alt={iconLabel} /> : icon;

  const content = (
    <>
      <div className={styles.iconImage}>{iconNode}</div>
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