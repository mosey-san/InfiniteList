import { useEffect, useRef, useState } from 'react';
import { InfiniteListProps } from '.';
import { useFetching } from '../../hooks/useFetching';
import { useViewort } from '../../hooks/useViewport';
import { PostServise } from './api/PostServise';
import styles from './InfiniteList.module.css';
import { PostItem, TPostItem } from './UI/PostItem';

export function InfiniteList({ itemsToLoad }: InfiniteListProps) {
  const offset = useRef(0);
  const isNotDone = useRef(true);
  const [items, setItems] = useState<TPostItem[]>([]);
  const [bottomBoxRef, boxInViewPort] = useViewort<HTMLDivElement>();
  const [fetchPosts, loading, error] = useFetching(async () => {
    if (isNotDone.current) {
      const newItems = await PostServise.get(itemsToLoad, offset.current);
      if (newItems.length === 0) {
        isNotDone.current = false;
      }
      setItems(prevItems => [...prevItems, ...newItems]);
      offset.current = offset.current + itemsToLoad;
    }
  });

  useEffect(() => {
    if (boxInViewPort) {
      fetchPosts();
    }
  }, [boxInViewPort]);

  return (
    <>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id} className={styles.item}>
            <PostItem {...item} />
          </li>
        ))}
        <div ref={bottomBoxRef} className={styles.box}></div>
      </ul>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>There was an error loading.</div>}
    </>
  );
}
