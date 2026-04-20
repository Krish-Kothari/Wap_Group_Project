import { useState, useEffect } from 'react';
import styles from './Notepad.module.css';

const Notepad = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('notepadText');
    if (saved) setText(saved);
  }, []);

  // Auto-save on every change
  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem('notepadText', newText);
  };

  const clearNotepad = () => {
    setText('');
    localStorage.setItem('notepadText', '');
  };

  return (
    <div className={styles.notepad}>
      <div className={styles.toolbar}>
        <span>📄 Notepad</span>
        <button onClick={clearNotepad} className={styles.clearBtn}>Clear</button>
      </div>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={handleChange}
        placeholder="Type anything... it saves automatically!"
      />
      <div className={styles.status}>
        <span>Characters: {text.length}</span>
      </div>
    </div>
  );
};

export default Notepad;