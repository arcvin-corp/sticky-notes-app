export type NoteCardPosition = {
  top: number;
  left: number;
};

export type NotePayload = {
  id: string;
  noteContent: string;
  timestamp: Date;
  position: NoteCardPosition;
  transform: string;
};

export type NoteMovePayload = {
  id: string;
  newPosition: NoteCardPosition;
};

export type NotesState = {
  noteCount: number;
  notes: NotePayload[];
};

export enum NotesActionTypes {
  ADD = 'add',
  REMOVE = 'remove',
  MOVE = 'move',
}

export type NoteAction = {
  type: NotesActionTypes;
  payload: NoteMovePayload | NotePayload | string;
};
