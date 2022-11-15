import { NotesState, NoteAction, NotesActionTypes } from '../types/types';

export const NotesReducer = (prevState: NotesState, action: NoteAction): NotesState => {
  switch (action.type) {
    case NotesActionTypes.ADD:
      if (typeof action.payload !== 'string' && 'position' in action.payload) {
        return {
          ...prevState,
          notes: [...prevState.notes, action.payload],
          noteCount: ++prevState.noteCount,
        };
      } else {
        return prevState;
      }

    case NotesActionTypes.MOVE:
      if (typeof action.payload !== 'string' && 'newPosition' in action.payload) {
        const data = action.payload;
        return {
          ...prevState,
          notes: prevState.notes.map(note => {
            if (note.id === data.id) {
              note.position = data.newPosition;
              return note;
            } else {
              return note;
            }
          }),
        };
      } else {
        return prevState;
      }

    case NotesActionTypes.REMOVE:
      if (typeof action.payload === 'string') {
        return {
          ...prevState,
          notes: prevState.notes.filter(note => note.id !== action.payload),
          noteCount: --prevState.noteCount,
        };
      } else {
        return prevState;
      }

    default:
      console.log('Returning default state');
      return prevState;
  }
};
