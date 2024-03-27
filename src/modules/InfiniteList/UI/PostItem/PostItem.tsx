import { memo } from 'react';
import { TPostItem } from '.';
import styles from './PostItem.module.css';

export const PostItem = memo(({ title, reactions, body, tags }: TPostItem) => {
  return (
    <div className={styles.post}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.body}>{body}</div>
      <div className={styles.wrap}>
        <ul className={styles.tags}>
          {tags.map(tag => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={styles.reactions}>
          <div className={styles.heart}></div>
          <div className={styles.count}>{reactions}</div>
        </div>
      </div>
    </div>
  );
});
