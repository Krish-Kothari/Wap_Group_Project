import React, { useState } from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import StartMenu from './components/StartMenu/StartMenu';
import Window from './components/Window/Window';
import YouTubeApp from './components/YouTubeApp/YouTubeApp';
import StonePaperScissor from './components/StonePaperScissor/StonePaperScissor';
import styles from './App.module.css';

function App() {
  const [startOpen, setStartOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null);

  const toggleStart = () => setStartOpen(prev => !prev);
  const closeStart = () => setStartOpen(false);
  const openWindow = (app) => setActiveWindow(app);
  const closeWindow = () => setActiveWindow(null);

  const renderWindowContent = () => {
    switch (activeWindow) {
      case 'thispc':
        return <p>This PC content</p>;
      case 'edge':
        return <p>Microsoft Edge content</p>;
      case 'youtube':
        return <YouTubeApp />;
      case 'sps':
        return <StonePaperScissor />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <Desktop openWindow={openWindow} />
      
      {activeWindow && (
        <Window 
          title={activeWindow === 'thispc' ? 'This PC' : 
                 activeWindow === 'edge' ? 'Microsoft Edge' : 
               activeWindow === 'youtube' ? 'YouTube' :
               'Stone Paper Scissor'} 
          fullscreen={activeWindow === 'youtube' || activeWindow === 'sps'}
          onClose={closeWindow}
        >
          {renderWindowContent()}
        </Window>
      )}

      <Taskbar toggleStart={toggleStart} />
      {startOpen && <StartMenu closeStart={closeStart} />}
    </div>
  );
}

export default App;