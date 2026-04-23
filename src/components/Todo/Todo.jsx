import styles from "./Todo.module.css";

export default function Todo() {
  return (
    <div className={styles.container}>
      <h2>Todo App</h2>

      <div className={styles.inputBox}>
        <input type="text" placeholder="Enter task..." />
        <button>Add</button>
      </div>

      <ul className={styles.list}>
        <li>Sample Task ❌</li>
      </ul>
    </div>
  );
}