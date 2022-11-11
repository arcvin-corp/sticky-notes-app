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
}

const NoteCard = ({ id, noteContent, timestamp, position, noteDeleteHandler }: NoteProps) => {
  const contentLines = noteContent.split('\n').filter(lineText => lineText);
  const itemsCount = contentLines.length;

  const noteDeleteHandlers = () => {
    console.log(id);
  };

  return (
    <div className={styles['note-card']} style={position}>
      <div className={styles.header}>
        <p>{`(${itemsCount} ${contentLines.length === 1 ? 'item' : 'items'})`}</p>
        <img id={styles['thumb-tack']} src={thumbTack} alt="Thumb-Tack image" />
        <img
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
      <ul>
        {contentLines.map(lineText => {
          return <li key={`${Math.round(Math.random() * 1000)}`}>{lineText}</li>;
        })}
      </ul>
    </div>
  );
};

export default NoteCard;
