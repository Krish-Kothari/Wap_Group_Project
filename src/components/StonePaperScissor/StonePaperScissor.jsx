import { useState } from 'react';
import styles from './StonePaperScissor.module.css';

const StonePaperScissor = () => {
  const [userMove, setUserMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [winnerMessage, setWinnerMessage] = useState('Pick a move to start!');
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [moveHistory, setMoveHistory] = useState([]);
  const [playerWinStreak, setPlayerWinStreak] = useState(0);

  function getRoundResult(player, computer) {
    if (player === computer) {
      return 'tie';
    }
    if (
      (player === '✂️' && computer === '📄') ||
      (player === '📄' && computer === '🪨') ||
      (player === '🪨' && computer === '✂️')
    ) {
      return 'player';
    }
    return 'computer';
  }

  function handleClick(move) {
    const moves = ['✂️', '📄', '🪨'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    const currentComputerMove = moves[randomIndex];
    const result = getRoundResult(move, currentComputerMove);
    setUserMove(move);
    setComputerMove(currentComputerMove);
    setRoundsPlayed((prevRounds) => prevRounds + 1);
    if (result === "player") {
      setUserPoints((prevPoints) => prevPoints + 1);
      setWinnerMessage('You win this round!');
      setPlayerWinStreak((prevStreak) => prevStreak + 1);
    } else if (result === "computer") {
      setComputerPoints((prevPoints) => prevPoints + 1);
      setWinnerMessage('Computer wins this round!');
      setPlayerWinStreak(0);
    } else {
      setWinnerMessage("It's a tie!");
      setPlayerWinStreak(0);
    }
    setMoveHistory((prevHistory) => [
      {
        round: roundsPlayed + 1,
        userMove: move,
        computerMove: currentComputerMove,
        result,
      },
      ...prevHistory,
    ]);
  }
  function resetGame() {
    setUserMove('');
    setComputerMove('');
    setUserPoints(0);
    setComputerPoints(0);
    setWinnerMessage('Pick a move to start!');
    setRoundsPlayed(0);
    setMoveHistory([]);
    setPlayerWinStreak(0);
  }

  return (
    <main className={styles.gameShell}>
      <section className={styles.gameCard}>
        <header className={styles.gameHeader}>
          <p className={styles.eyebrow}>Classic Mini Game</p>
          <h1 className={styles.title}>Rock Paper Scissor</h1>
          <p className={styles.winnerBanner}>{winnerMessage}</p>
        </header>

        <section className={styles.scoreboard} aria-label="scoreboard">
          <article className={styles.scoreBox}>
            <h2>Points</h2>
            <p>
              <span>You {userPoints}</span>
              <span>Computer {computerPoints}</span>
            </p>
          </article>

          <article className={styles.scoreBox}>
            <h2>Rounds</h2>
            <p>{roundsPlayed}</p>
          </article>

          <article className={styles.scoreBox}>
            <h2>Win Streak</h2>
            <p>{playerWinStreak}</p>
          </article>
        </section>

        <section className={styles.movesRow} aria-label="latest-moves">
          <article className={styles.moveTile}>
            <h3>Computer</h3>
            <div className={styles.moveEmoji}>{computerMove || '-'}</div>
          </article>

          <article className={styles.moveTile}>
            <h3>You</h3>
            <div className={styles.moveEmoji}>{userMove || '-'}</div>
          </article>
        </section>

        <section className={styles.controls} aria-label="game-controls">
          <button className={styles.moveBtn} onClick={() => handleClick('✂️')}>✂️</button>
          <button className={styles.moveBtn} onClick={() => handleClick('📄')}>📄</button>
          <button className={styles.moveBtn} onClick={() => handleClick('🪨')}>🪨</button>
          <button className={styles.resetBtn} onClick={resetGame}>Reset Game</button>
        </section>

        <section className={styles.historyWrap}>
          <h2>Move History</h2>
          {moveHistory.length === 0 ? (
            <p className={styles.historyEmpty}>No rounds played yet.</p>
          ) : (
            <ul className={styles.historyList}>
              {moveHistory.map((item) => (
                <li className={styles.historyItem} key={item.round}>
                  <span className={styles.roundPill}>Round {item.round}</span>
                  <span>Computer {item.computerMove}</span>
                  <span>You {item.userMove}</span>
                  <span className={`${styles.result} ${styles[item.result]}`}>
                    {item.result === "player"
                      ? 'You won'
                      : item.result === 'computer'
                        ? 'Computer won'
                        : 'Tie'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
};
export default StonePaperScissor;