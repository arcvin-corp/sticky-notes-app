import React, { useReducer, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getRandom } from './common/utils';
import styles from './App.module.css';
import NoteForm from './components/Forms/NoteForm';
import { NotesReducer } from './reducers/notesReducer';
import NoteCard from './components/Notes/Note';
import { NotesState, NoteCardPosition, NotesActionTypes, NotePayload, NoteAction } from './types/types';

const INIT_NOTES_STATE: NotesState = {
  noteCount: 0,
  notes: [],
};

function App() {
  const appRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [notesState, dispatch] = useReducer(NotesReducer, INIT_NOTES_STATE);

  const onNoteCreateHandler = (noteInput: string) => {
    const position: NoteCardPosition = {
      top: getRandom(0, 100),
      left: getRandom(0, 100),
    };

    const addNote: NoteAction = {
      type: NotesActionTypes.ADD,
      payload: {
        id: uuidv4(),
        noteContent: noteInput,
        timestamp: new Date(),
        position: position,
        transform: `rotate(${getRandom(-10, 10)}deg)`,
      },
    };
    dispatch(addNote);
  };

  const onNoteDeleteHandler = (id: string) => {
    const removeNote: NoteAction = {
      type: NotesActionTypes.REMOVE,
      payload: id,
    };
    dispatch(removeNote);
  };

  const onDragEndHandler = (id: string, newPosition: NoteCardPosition) => {
    if (appRef.current !== null) {
      const top = (newPosition.top / appRef.current.offsetHeight) * 100 - 2;
      const left = (newPosition.left / appRef.current.offsetWidth) * 100 - 10;

      const moveNote: NoteAction = {
        type: NotesActionTypes.MOVE,
        payload: {
          id: id,
          newPosition: {
            top: top >= 0 ? top : 0,
            left: left >= 0 ? left : 0,
          },
        },
      };

      dispatch(moveNote);
    }
  };

  const onDragOverHandler = (event: React.SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation;
    event.preventDefault();
  };

  return (
    <div className={styles.app} ref={appRef} onDragOver={onDragOverHandler}>
      <NoteForm noteCreateHandler={onNoteCreateHandler} />
      {notesState.notes.map(notePayload => {
        return (
          <NoteCard
            key={notePayload.id}
            notePayload={notePayload}
            noteDeleteHandler={onNoteDeleteHandler}
            dragEndHandler={onDragEndHandler}
          />
        );
      })}
    </div>
  );
}

export default App;
