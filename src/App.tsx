import React, { useReducer, useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import NoteForm from './components/Forms/NoteForm';
import { NoteCardPosition, INIT_NOTES_STATE, NotesActionTypes, NotesReducer, NotePayload } from './reducers/notesReducer';
import NoteCard from './components/Notes/Note';

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

function App() {
  const appRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [notesState, dispatch] = useReducer(NotesReducer, INIT_NOTES_STATE);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (appRef.current !== null) {
      setHeight(appRef.current?.offsetHeight);
      setWidth(appRef.current?.offsetWidth);
    }
  }, [notesState.noteCount]);

  const onNoteCreateHandler = (noteInput: string) => {
    const position: NoteCardPosition = {
      top: getRandom(5, 70),
      right: getRandom(5, 85),
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

  const onDragEndHandler = (id: string, noteContent: string, timestamp: Date, x: number, y: number, transform: string) => {
    if (appRef.current !== null) {
      const top = (y / appRef.current.offsetHeight) * 100 - 15; // Eyeball adjustment values, don't rely on them;
      const right = 100 - (x / appRef.current.offsetWidth) * 100 - 5; // Eyeball adjustment values, don't rely on them;
      const position: NoteCardPosition = {
        top: top >= 0 ? top : 0,
        right: right >= 0 ? right : 0,
        transform: `rotate(${getRandom(-10, 10)}deg)`,
      };
      console.log(position);
      dispatch({
        type: NotesActionTypes.MOVE,
        payload: { id: id, noteContent: noteContent, timestamp: timestamp, position: position },
      });
    }
  };

  return (
    <div className={styles.app} ref={appRef}>
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
            dragEndHandler={onDragEndHandler}
          />
        );
      })}
    </div>
  );
}

export default App;
