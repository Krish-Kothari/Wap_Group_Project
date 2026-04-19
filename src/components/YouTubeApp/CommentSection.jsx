import React from 'react';
import styles from './CommentSection.module.css';

const CommentSection = ({ comments }) => {
  return (
    <div className={styles.comments}>
      <h3 className={styles.heading}>Comments • {comments.length}</h3>
      {comments.map(comment => (
        <div key={comment.id} className={styles.comment}>
          <img src={comment.avatar} alt={comment.author} className={styles.avatar} />
          <div className={styles.content}>
            <p className={styles.author}>{comment.author} <span className={styles.time}>{comment.time}</span></p>
            <p className={styles.text}>{comment.text}</p>
            <div className={styles.actions}>
              <button>👍 {comment.likes}</button>
              <button>👎</button>
              <button>Reply</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;