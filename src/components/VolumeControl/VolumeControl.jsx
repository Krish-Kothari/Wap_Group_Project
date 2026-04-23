import { useState } from 'react';
import styles from './VolumeControl.module.css';

const VolumeControl = () => {
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleVolumeChange = (e) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVol === 0 && !isMuted) {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const getIcon = () => {
    if (isMuted || volume === 0) return '🔇';
    if (volume < 33) return '🔈';
    if (volume < 66) return '🔉';
    return '🔊';
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        className={styles.iconButton}
        onClick={toggleMute}
        title={`Volume: ${isMuted ? 'Muted' : `${volume}%`}`}
      >
        {getIcon()}
      </button>

      {isHovering && (
        <>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className={styles.slider}
          />
          <span className={styles.value}>
            {isMuted ? 'Muted' : `${volume}%`}
          </span>
        </>
      )}
    </div>
  );
};

export default VolumeControl;