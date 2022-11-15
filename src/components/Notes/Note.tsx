import React from 'react';
import styles from './NoteCard.module.css';
import { NotePayload, NoteCardPosition } from '../../types/types';
import thumbTack from '../../assets/thumb-tack.svg';
import deleteNote from '../../assets/icons8-cancel.svg';

// interface NoteProps {
//   id: string;
//   noteContent: string;
//   timestamp: Date;
//   position: NoteCardPosition;
//   noteDeleteHandler: (note: NotePayload) => void;
//   dragEndHandler: (id: string, noteContent: string, timestamp: Date, x: number, y: number, transform: string) => void;
// }

interface NoteProps {
  notePayload: NotePayload;
  noteDeleteHandler: (id: string) => void;
  dragEndHandler: (id: string, newPosition: NoteCardPosition) => void;
}

export const NoteCard = (props: NoteProps) => {
  const notePayload = props.notePayload;
  const contentLines = notePayload.noteContent.split('\n').filter(lineText => lineText);
  const itemsCount = contentLines.length;

  const notePosition = {
    top: `${notePayload.position.top}%`,
    left: `${notePayload.position.left}%`,
    transform: notePayload.transform,
  };

  return (
    <div
      draggable={true}
      onDragEnd={(event: React.DragEvent<HTMLDivElement>) => {
        props.dragEndHandler(notePayload.id, { top: event.pageY, left: event.pageX });
      }}
      className={`${styles['note-card']} ${styles.grabbable}`}
      style={notePosition}
    >
      <div className={styles.header}>
        <h3>{`(${itemsCount} ${contentLines.length === 1 ? 'item' : 'items'})`}</h3>
        <img draggable={false} id={styles['thumb-tack']} src={thumbTack} alt="Thumb-Tack image" />
        <img
          draggable={false}
          onClick={() => {
            props.noteDeleteHandler(notePayload.id);
          }}
          id={styles['delete-note']}
          src={deleteNote}
          alt="Thumb-Tack image"
        />
      </div>
      <h4>{notePayload.timestamp.toLocaleString()}</h4>
      <ul>
        {contentLines.map(lineText => {
          return <li key={`${Math.round(Math.random() * 1000)}`}>{lineText}</li>;
        })}
      </ul>
    </div>
  );
};

export default NoteCard;
