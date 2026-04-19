import { useState } from 'react';
import styles from './Calculator.module.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [operator, setOperator] = useState('');

  const calculate = (num1, num2, op) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (op === '+') return n1 + n2;
    if (op === '-') return n1 - n2;
    if (op === '*') return n1 * n2;
    if (op === '/') {
      if (n2 === 0) return 'Error';
      return n1 / n2;
    }
    if (op === '%') return n1 % n2;

    return 'Error';
  };

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setDisplay('');
      setFirstNumber('');
      setOperator('');
      return;
    }

    if (value === 'DEL') {
      setDisplay((prev) => prev.slice(0, prev.length - 1));
      return;
    }

    if (value === '+/-') {
      if (display !== '') {
        const currentNumber = parseFloat(display);
        setDisplay(String(currentNumber * -1));
      }
      return;
    }

    if (value === '+' || value === '-' || value === '*' || value === '/' || value === '%') {
      setFirstNumber(display);
      setOperator(value);
      setDisplay('');
      return;
    }

    if (value === '=') {
      const result = calculate(firstNumber, display, operator);
      setDisplay(String(result));
      setFirstNumber(String(result));
      return;
    }

    setDisplay((prev) => prev + value);
  };

  return (
    <div className={styles.calculatorApp}>
      <div className={styles.calculator}>
        <input
          type="text"
          id="display"
          className={styles.display}
          value={display}
          readOnly
        />

        <div className={styles.buttons}>
          <button className={styles.gray} onClick={() => handleButtonClick('AC')}>AC</button>
          <button className={styles.gray} onClick={() => handleButtonClick('DEL')}>DEL</button>
          <button className={styles.gray} onClick={() => handleButtonClick('+/-')}>+/-</button>
          <button className={styles.orange} onClick={() => handleButtonClick('/')}>/</button>

          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button className={styles.orange} onClick={() => handleButtonClick('*')}>*</button>

          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button className={styles.orange} onClick={() => handleButtonClick('-')}>-</button>

          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button className={styles.orange} onClick={() => handleButtonClick('+')}>+</button>

          <button onClick={() => handleButtonClick('%')}>%</button>
          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('.')}>.</button>
          <button className={styles.orange} onClick={() => handleButtonClick('=')}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;