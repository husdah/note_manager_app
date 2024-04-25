"use client"     // client component

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useNoteContext } from '../../../context/noteContext';

export default function EditForm({ note }) {
    const router = useRouter()

    const [title, setTitle] = useState(note ? note.title : '')
    const [body, setBody] = useState(note ? note.body : '')
    const [priority, setPriority] = useState(note ? note.priority : 'low')
    const [isLoading, setIsLoading] = useState(false)

    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)

    const { editNote } = useNoteContext();

    useEffect(() => {
        setTitle(note.title)
        setBody(note.body)
        setPriority(note.priority)  
    },[note])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        let valid = true;

        if(title.trim() === ''){
          valid = false;
          setTitleError(true)
        }
        
        if(body.trim() === ''){
          valid = false;
          setBodyError(true)
        }
        
        if(valid){
          setIsLoading(true)

          editNote(note.id, { title, body, priority });
  
          // Clear the form fields
          setTitle('');
          setBody('');
          setPriority('low');
  
          router.refresh()
          router.push('/')
        } 
    }

  return (
    <form className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title ? title : ''}
          className={titleError ? 'inputError' : ''}
          onFocus={() => setTitleError(false)}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body ? body : ''}
          className={bodyError ? 'inputError' : ''}
          onFocus={() => setBodyError(false)}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select 
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button 
        className="btn-primary" 
        disabled={isLoading}
        onClick={handleSubmit}
      >
      {isLoading && <span>Editing...</span>}
      {!isLoading && <span>Save Changes</span>}
    </button>
    </form>
  )
}
