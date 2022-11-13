export interface NoteCardPosition {
  top: number;
  right: number;
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
  MOVE = 'move',
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

    case NotesActionTypes.MOVE:
      return {
        ...notesState,
        notes: notesState.notes.map(note => {
          if (note.id === action.payload.id) {
            note.position = action.payload.position;
            return note;
          }
          return note;
        }),
      };
    default:
      console.log('Returning default state');
      return notesState;
  }
};
