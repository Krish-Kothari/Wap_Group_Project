import React, { useState } from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import StartMenu from './components/StartMenu/StartMenu';
import Window from './components/Window/Window';
import styles from './App.module.css';

function App() {
  const [startOpen, setStartOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null); // 'thispc', 'edge', etc.

  const toggleStart = () => setStartOpen(prev => !prev);
  const closeStart = () => setStartOpen(false);

  const openWindow = (app) => setActiveWindow(app);
  const closeWindow = () => setActiveWindow(null);

  return (
    <div className={styles.app}>
      <Desktop openWindow={openWindow} />
      
      {activeWindow && (
        <Window title={activeWindow === 'thispc' ? 'This PC' : 'Microsoft Edge'} onClose={closeWindow}>
          <p>Content of {activeWindow}</p>
        </Window>
      )}

      <Taskbar toggleStart={toggleStart} />
      
      {startOpen && <StartMenu closeStart={closeStart} />}
    </div>
  );
}

export default App;