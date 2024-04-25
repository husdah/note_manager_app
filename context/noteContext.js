"use client" 

import React, { createContext, useContext, useState } from 'react';

// Create the context
const NoteContext = createContext();

// Define a custom hook to use the context
export const useNoteContext = () => useContext(NoteContext);

// Define the provider component
export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const editNote = (id, updatedNote) => {
    const updatedNotes = notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note));
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};