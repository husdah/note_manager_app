"use client"     // client component

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNoteContext } from '../../../context/noteContext';

export default function CreateForm() {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState('low')
    const [isLoading, setIsLoading] = useState(false)

    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)

    const { addNote } = useNoteContext();

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

          addNote({
            id: uuidv4(),
            title,
            body,
            priority
          });
  
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
          value={title}
          className={titleError ? 'inputError' : ''}
          onFocus={() => setTitleError(false)}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
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
      {isLoading && <span>Adding...</span>}
      {!isLoading && <span>Add Note</span>}
    </button>
    </form>
  )
}
