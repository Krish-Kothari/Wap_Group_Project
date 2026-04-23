import React, { useState } from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import StartMenu from './components/StartMenu/StartMenu';
import Window from './components/Window/Window';
import YouTubeApp from './components/YouTubeApp/YouTubeApp';
import StonePaperScissor from './components/StonePaperScissor/StonePaperScissor';
import Calculator from './components/Calculator/Calculator';
import Calendar from './components/Calendar/Calendar';
import Todo from './components/Todo/Todo';
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
      case 'calculator':           
        return <Calculator />;
      case 'calendar':
        return <Calendar />;
      case 'todo':
        return <Todo />;
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
               activeWindow === 'sps' ? 'Stone Paper Scissor' :
               activeWindow === 'calculator' ? 'Calculator' :
               activeWindow === 'calendar' ? 'Calendar' :
               activeWindow === 'todo' ? 'Todo' : ''} 
          fullscreen={activeWindow === 'youtube' || activeWindow === 'sps' || activeWindow === 'calculator'}
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