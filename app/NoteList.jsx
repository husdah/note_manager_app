"use client" // client component

import Link from "next/link";
import Swal from 'sweetalert2';
import { FaTrash, FaSort } from "react-icons/fa"
import { useState } from 'react';
import { useNoteContext } from '../context/noteContext';

export default function NoteList() {
  const { notes, deleteNote } = useNoteContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByPriority, setSortByPriority] = useState(null);

  const filteredNotes = searchQuery
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  const sortedNotes = filteredNotes.sort((a, b) => {
    if (sortByPriority === 'low') {
      if (a.priority === 'low' && b.priority !== 'low') return -1;
      if (a.priority !== 'low' && b.priority === 'low') return 1;
      return a.priority === 'medium' ? -1 : b.priority === 'medium' ? 1 : 0;
    } else if (sortByPriority === 'high') {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return a.priority === 'medium' ? -1 : b.priority === 'medium' ? 1 : 0;
    } else {
      // When sortByPriority is null, no sorting is applied
      return 0;
    }
  });
  
  const toggleSortByPriority = () => {
    if (sortByPriority === 'low') {
      setSortByPriority('high');
    } else {
      setSortByPriority('low');
    }
  };

  const handelDelete = async (id) =>{
    const confirmDeletion = await Swal.fire({
      title: 'Delete Note',
      text: 'Are you sure you want to delete this note?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (confirmDeletion.isConfirmed) {
      deleteNote(id)
    }
  }

  return (
    <>
     {notes.length === 0 ? (
        <p className="text-center">There is no available notes!</p>
      ) : (
        <>
          <div className="filters">
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={toggleSortByPriority}>
              <FaSort/> Sort by Priority <span>({sortByPriority === 'low' ? 'Low to High' : 'High to Low'})</span>
            </button>
          </div>

          {sortedNotes.length > 0 && sortedNotes.map((note) => (
          <div key={note.id} className="card my-5">
            <Link href={`/notes/${note.id}`}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                <div className={`pill ${note.priority}`}>
                    {note.priority} priority
                </div>
            </Link>
            <button className="deleteBtn" onClick={() => handelDelete(note.id)}><FaTrash/> delete</button>
          </div>
          ))}
        </>
      )
      }
    </>
  )
}
