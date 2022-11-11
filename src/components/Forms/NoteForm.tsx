import React, { useState, useEffect } from 'react';
import styles from './NoteForm.module.css';

interface NoteFormProps {
  noteCreateHandler: (noteInput: string) => void;
}

const NoteForm = ({ noteCreateHandler }: NoteFormProps) => {
  const [noteInput, setNoteInput] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const formValidator = setTimeout(() => {
      noteInput.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false);
    }, 500);
    return () => {
      clearTimeout(formValidator);
    };
  }, [noteInput]);

  const createHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    noteCreateHandler(noteInput);
    setNoteInput('');
    setIsFormValid(false);
  };

  return (
    <div>
      <form className={styles.form}>
        <textarea
          onChange={e => {
            setNoteInput(e.target.value);
          }}
          value={noteInput}
          placeholder="Add your note..."
        ></textarea>
        <button onClick={createHandler} disabled={!isFormValid}>
          Create Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
