import React from 'react';
import Icon from '../Icon/Icon';
import styles from './Desktop.module.css';
import ytIcon from '../../assets/ytIcon.png';
import thisPC from '../../assets/thisPC.png';
import background from '../../assets/background.png';
import recycleBin from '../../assets/recycleBin.png';
import edge from '../../assets/edge.png';
import github from '../../assets/github.png';
// import edgeIcon from '../../assets/edgeIcon.png';
// import spsIcon from '../../assets/spsIcon.png';
// import calculatorIcon from '../../assets/calculatorIcon.png';

const Desktop = ({ openWindow }) => {
  return (
    <div
      className={styles.desktop}
      style={{ backgroundImage: `url(${background})` }}
    >
      <Icon
        icon={<img src={thisPC} alt="This PC" style={{width: '30px',height:'30px'}} />}
        label="This PC"
        onClick={() => openWindow('')}
      />
      <Icon
        icon={<img src={recycleBin} alt="Recycle Bin" style={{width: '30px',height:'30px'}} />}
        label="Recycle Bin"
      />
      <Icon
        icon={<img src={edge} alt="Microsoft Edge" style={{width: '30px',height:'30px'}} />}
        label="Microsoft Edge"
        onClick={() => window.open("_blank")}
      />
      {/* YouTube*/}
      <Icon
        icon={<img src={ytIcon} alt="YouTube" style={{ width: '24px', height: '24px' }} />}
        label="YouTube"
        onClick={() => openWindow('youtube')}
      />
      <Icon
        icon="🎮"
        label="Stone Paper Scissor"
        onClick={() => openWindow('sps')}
      />
      <Icon
        icon="🧮"
        label="Calculator"
        onClick={() => openWindow('calculator')}
      />
      <Icon
        icon={<img src={github} alt="GitHub" style={{ width: '24px', height: '24px' }} />}
        label="GitHub Repo"
        onClick={() => window.open("https://github.com/Krish-Kothari/Wap_Group_Project", "_blank")}
      />
    </div>
  );
};

export default Desktop;