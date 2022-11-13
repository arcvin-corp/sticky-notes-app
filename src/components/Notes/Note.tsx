import React from 'react';
import styles from './NoteCard.module.css';
import { NoteCardPosition, NotePayload } from '../../reducers/notesReducer';
import thumbTack from '../../assets/thumb-tack.svg';
import deleteNote from '../../assets/icons8-cancel.svg';

interface NoteProps {
  id: string;
  noteContent: string;
  timestamp: Date;
  position: NoteCardPosition;
  noteDeleteHandler: (note: NotePayload) => void;
  dragEndHandler: (id: string, noteContent: string, timestamp: Date, x: number, y: number, transform: string) => void;
}

export const NoteCard = ({ id, noteContent, timestamp, position, noteDeleteHandler, dragEndHandler }: NoteProps) => {
  const contentLines = noteContent.split('\n').filter(lineText => lineText);
  const itemsCount = contentLines.length;

  const notePositionAndRotation = {
    ...position,
    top: `${position.top}%`,
    right: `${position.right}%`,
  };

  const onDrageEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const newPos = {
      x: event.pageX,
      y: event.pageY,
    };
  };

  return (
    <div
      draggable={true}
      onDragEnd={(event: React.DragEvent<HTMLDivElement>) => {
        const transform = event.currentTarget.style.getPropertyValue('transform');
        dragEndHandler(id, noteContent, timestamp, event.pageX, event.pageY, transform);
      }}
      className={`${styles['note-card']} ${styles.grabbable}`}
      style={notePositionAndRotation}
    >
      <div className={styles.header}>
        <h3>{`(${itemsCount} ${contentLines.length === 1 ? 'item' : 'items'})`}</h3>
        <img draggable={false} id={styles['thumb-tack']} src={thumbTack} alt="Thumb-Tack image" />
        <img
          draggable={false}
          onClick={() => {
            noteDeleteHandler({
              id,
              noteContent,
              timestamp,
              position,
            });
          }}
          id={styles['delete-note']}
          src={deleteNote}
          alt="Thumb-Tack image"
        />
      </div>
      <h4>{timestamp.toLocaleString()}</h4>
      <ul>
        {contentLines.map(lineText => {
          return <li key={`${Math.round(Math.random() * 1000)}`}>{lineText}</li>;
        })}
      </ul>
    </div>
  );
};

export default NoteCard;
