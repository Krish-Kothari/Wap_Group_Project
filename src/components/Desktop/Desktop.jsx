import React from 'react';
import Wallpaper from './Wallpaper';
import styles from './Desktop.module.css';

const Desktop = () => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.desktop} onContextMenu={handleContextMenu}>
      <Wallpaper />
      <div className={styles.iconsContainer}>
        {/* Icons to be added once components are created */}
      </div>
    </div>
  );
};

export default Desktop;