"use client"; // client component

import { notFound } from "next/navigation"
import { useEffect, useState } from 'react';
import { useNoteContext } from '../../../context/noteContext';
import EditForm from "./EditForm";

export default function NoteDetails({ params }) {
    const { notes } = useNoteContext();
    const [note, setNote] = useState({});

    useEffect(() => {
        //console.log("notes",notes);
        //console.log("params",params.id);
        const  id  = params.id;
        const note = notes.find(note => note.id === id);
    
        if (note) {
          setNote(note);
        }else{
          setNote();
        }
    }, [params, notes]);

    return (
      <>
      {note ? (
        <>
        <h2 className="text-primary text-center">Edit Note</h2>
        <EditForm note={note}/>
        </>
      ) : 
        notFound()
       }
      </>
    );
}