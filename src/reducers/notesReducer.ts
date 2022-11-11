export interface Note {
  id: string;
  noteContent: string;
  timestamp: Date;
}

export interface NotesState {
  noteCount: number;
  notes: Note[];
}

export const INIT_NOTES_STATE: NotesState = {
  noteCount: 0,
  notes: [],
};

export enum NotesActionTypes {
  ADD = 'add',
  REMOVE = 'remove',
}

export interface NotesAction {
  type: NotesActionTypes;
  payload: Note;
}

export const NotesReducer = (notesState: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case NotesActionTypes.ADD:
      console.log('Note added');
      return { ...notesState, notes: [...notesState.notes, action.payload], noteCount: notesState.noteCount++ };

    case NotesActionTypes.REMOVE:
      console.log('Note removed');
      return notesState;

    default:
      console.log('Returning default state');
      return notesState;
  }
};
