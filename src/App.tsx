import { useState } from 'react';
import styles from './App.module.css';
import NoteForm from './components/Notes/NoteForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.app}>
      <NoteForm />
    </div>
  );
}

export default App;
