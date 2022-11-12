import React, { useReducer, useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import NoteForm from './components/Forms/NoteForm';
import { NoteCardPosition, INIT_NOTES_STATE, NotesActionTypes, NotesReducer, NotePayload } from './reducers/notesReducer';
import NoteCard from './components/Notes/Note';

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

function App() {
  const ref: any = useRef(null);
  const [notesState, dispatch] = useReducer(NotesReducer, INIT_NOTES_STATE);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setHeight(ref.current.offsetHeight);
    setWidth(ref.current.offsetWidth);

    // 👇️ if you need access to parent
    // of the element on which you set the ref
    console.log(ref.current.parentElement);
    console.log(ref.current.parentElement.offsetHeight);
    console.log(ref.current.parentElement.offsetWidth);
  }, []);

  const onNoteCreateHandler = (noteInput: string) => {
    const position: NoteCardPosition = {
      top: getRandom(50, 55),
      right: getRandom(50, 55),
      transform: `rotate(${getRandom(-10, 10)}deg)`,
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
    <div className={styles.app} ref={ref}>
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
