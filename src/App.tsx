import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import NoteForm from './components/Forms/NoteForm';
import { Note, NotesState, INIT_NOTES_STATE, NotesActionTypes, NotesAction, NotesReducer } from './reducers/notesReducer';

function App() {
  const [notesState, dispatch] = useReducer(NotesReducer, INIT_NOTES_STATE);

  const onNoteCreateHandler = (noteInput: string) => {
    dispatch({
      type: NotesActionTypes.ADD,
      payload: { id: uuidv4(), noteContent: noteInput, timestamp: new Date() },
    });
  };

  return (
    <div className={styles.app}>
      <NoteForm noteCreateHandler={onNoteCreateHandler} />
      <h1>{JSON.stringify(notesState)}</h1>
    </div>
  );
}

export default App;
