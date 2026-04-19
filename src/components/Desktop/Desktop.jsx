import React from 'react';
import Icon from '../Icon/Icon';
import styles from './Desktop.module.css';

const Desktop = ({ openWindow }) => {
  return (
    <div className={styles.desktop}>
      <Icon
        icon="🖥️"
        label="This PC"
        onClick={() => openWindow('')}
      />
      <Icon
        icon="🗑️"
        label="Recycle Bin"
        onClick={() => {}}
      />
      <Icon
        icon="🌐"
        label="Microsoft Edge"
        onClick={() => openWindow('')}
      />
      {/* YouTube*/}
      <Icon
        icon="▶️"
        label="YouTube"
        onClick={() => openWindow('youtube')}
      />
      <Icon
        icon="🎮"
        label="Stone Paper Scissor"
        onClick={() => openWindow('sps')}
      />
    </div>
  );
};

export default Desktop;