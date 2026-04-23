import React, { useState } from 'react';
import styles from './CommentSection.module.css';

const CommentSection = ({ comments, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = commentText.trim();
    if (!trimmed) return;

    if (onAddComment) {
      onAddComment(trimmed);
    }
    setCommentText('');
  };

  const toggleCommentLike = (id) => {
    setLikedComments((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={styles.comments}>
      <h3 className={styles.heading}>Comments • {comments.length}</h3>
      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
      {comments.map(comment => (
        <div key={comment.id} className={styles.comment}>
          <img src={comment.avatar} alt={comment.author} className={styles.avatar} />
          <div className={styles.content}>
            <p className={styles.author}>{comment.author} <span className={styles.time}>{comment.time}</span></p>
            <p className={styles.text}>{comment.text}</p>
            <div className={styles.actions}>
              <button onClick={() => toggleCommentLike(comment.id)}>
                👍 {comment.likes + (likedComments[comment.id] ? 1 : 0)}
              </button>
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