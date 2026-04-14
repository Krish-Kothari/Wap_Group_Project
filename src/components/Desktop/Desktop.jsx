import React from 'react';
import Icon from './Icon/Icon';
import styles from './Desktop.module.css';

const Desktop = ({ openWindow }) => {
  return (
    <div className={styles.desktop}>
      <Icon
        icon="🖥️"
        label="This PC"
        onClick={() => openWindow('thispc')}
      />
      <Icon
        icon="🗑️"
        label="Recycle Bin"
        onClick={() => {}}
      />
      <Icon
        icon="🌐"
        label="Microsoft Edge"
        onClick={() => openWindow('edge')}
      />
    </div>
  );
};

export default Desktop;