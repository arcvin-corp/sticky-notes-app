import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import NoteForm from './components/Forms/NoteForm';
import { NoteCardPosition, INIT_NOTES_STATE, NotesActionTypes, NotesReducer, NotePayload } from './reducers/notesReducer';
import NoteCard from './components/Notes/Note';

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

function App() {
  const [notesState, dispatch] = useReducer(NotesReducer, INIT_NOTES_STATE);

  const onNoteCreateHandler = (noteInput: string) => {
    const position: NoteCardPosition = {
      top: getRandom(20, 380),
      left: getRandom(20, 800),
      transform: `rotate(${getRandom(-15, 15)}deg)`,
    };

    dispatch({
      type: NotesActionTypes.ADD,
      payload: { id: uuidv4(), noteContent: noteInput, timestamp: new Date(), position: position },
    });
  };

  const onNoteDeleteHandler = (note: NotePayload) => {
    dispatch({
      type: NotesActionTypes.REMOVE,
      payload: { id: note.id, noteContent: note.noteContent, timestamp: note.timestamp, position: note.position },
    });
  };

  return (
    <div className={styles.app}>
      <NoteForm noteCreateHandler={onNoteCreateHandler} />
      {notesState.notes.map(note => {
        return (
          <NoteCard
            key={note.id}
            id={note.id}
            noteContent={note.noteContent}
            timestamp={note.timestamp}
            position={note.position}
            noteDeleteHandler={onNoteDeleteHandler}
          />
        );
      })}
    </div>
  );
}

export default App;
