import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NoteProvider, useNoteContext } from '../context/noteContext';

describe('Note Context Tests', () => {
  test('NoteProvider initializes with empty notes array', () => {
    const TestComponent = () => {
      const { notes } = useNoteContext();
      return <div>{JSON.stringify(notes)}</div>;
    };

    const { container } = render(
      <NoteProvider>
        <TestComponent />
      </NoteProvider>
    );

    expect(container.textContent).toEqual('[]');
  });

  test('addNote function adds a new note', () => {
    const TestComponent = () => {
      const { notes, addNote } = useNoteContext();
      return (
        <div>
          <button onClick={() => addNote({ id: 1, title: 'Test Note' })}>Add Note</button>
          <div>{JSON.stringify(notes)}</div>
        </div>
      );
    };

    const { container, getByText } = render(
      <NoteProvider>
        <TestComponent />
      </NoteProvider>
    );

    fireEvent.click(getByText('Add Note'));

    expect(container.textContent).toContain('Test Note');
  });

  test('editNote function updates an existing note', () => {
    const TestComponent = () => {
      const { notes, addNote, editNote } = useNoteContext();
      return (
        <div>
          <button onClick={() => addNote({ id: 1, title: 'Test Note' })}>Add Note</button>
          <button onClick={() => editNote(1, { title: 'Updated Note' })}>Edit Note</button>
          <div>{JSON.stringify(notes)}</div>
        </div>
      );
    };

    const { container, getByText } = render(
      <NoteProvider>
        <TestComponent />
      </NoteProvider>
    );

    fireEvent.click(getByText('Add Note'));
    fireEvent.click(getByText('Edit Note'));

    expect(container.textContent).toContain('Updated Note');
  });

  test('deleteNote function deletes an existing note', () => {
    const TestComponent = () => {
      const { notes, addNote, deleteNote } = useNoteContext();
      return (
        <div>
          <button onClick={() => addNote({ id: 2, title: 'Test Note 2' })}>Add Note</button>
          <button onClick={() => deleteNote(2)}>Delete Note</button>
          <div>{JSON.stringify(notes)}</div>
        </div>
      );
    };

    const { container, getByText } = render(
      <NoteProvider>
        <TestComponent />
      </NoteProvider>
    );

    fireEvent.click(getByText('Add Note'));
    fireEvent.click(getByText('Delete Note'));

    expect(container.textContent).toContain('Note[]');
  });
});
