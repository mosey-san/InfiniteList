import { useState } from 'react';
import styles from './App.module.css';
import { InfiniteList } from './modules/InfiniteList';

function App() {
  const [itemsToLoad, setItemsToLoad] = useState(10);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Infinite Scroll List</h1>
      <fieldset className={styles.field}>
        <label className={styles.label}>Items to load:</label>
        <select
          className={styles.select}
          value={itemsToLoad}
          onChange={e => setItemsToLoad(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </fieldset>
      <InfiniteList itemsToLoad={itemsToLoad} />
    </main>
  );
}

export default App;
