export interface NoteCardPosition {
  top: number;
  left: number;
  transform: string;
}

export interface NotePayload {
  id: string;
  noteContent: string;
  timestamp: Date;
  position: NoteCardPosition;
}

export interface NotesState {
  noteCount: number;
  notes: NotePayload[];
}

export const INIT_NOTES_STATE: NotesState = {
  noteCount: 0,
  notes: [],
};

export enum NotesActionTypes {
  ADD = 'add',
  REMOVE = 'remove',
}

export interface NoteAction {
  type: NotesActionTypes;
  payload: NotePayload;
}

export const NotesReducer = (notesState: NotesState, action: NoteAction): NotesState => {
  switch (action.type) {
    case NotesActionTypes.ADD:
      return {
        ...notesState,
        notes: [...notesState.notes, action.payload],
        noteCount: notesState.noteCount++,
      };

    case NotesActionTypes.REMOVE:
      return {
        ...notesState,
        notes: notesState.notes.filter(note => note.id !== action.payload.id),
        noteCount: notesState.noteCount--,
      };

    default:
      console.log('Returning default state');
      return notesState;
  }
};
