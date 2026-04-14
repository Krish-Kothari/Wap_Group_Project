import React from 'react';
import styles from './Wallpaper.module.css';

const Wallpaper = () => {
  return (
    <div className={styles.wallpaper}>
      <img
        src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="wallpaper"
        className={styles.image}
      />
    </div>
  );
};

export default Wallpaper;