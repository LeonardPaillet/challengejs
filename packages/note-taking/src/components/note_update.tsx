import type { Note } from '../model/note'

import { Link , useParams } from '@tanstack/react-router'
import React, { useState } from 'react';

import { useNoteStore } from "../store/note";

import { NotFoundNote } from './not_found';



const NoteUpdate: React.FC = () => {
    const parameters = useParams({ from: '/$uuid/update' })
    const getNote = useNoteStore((state)=>state.getNote)
    const note = getNote(parameters.uuid)
    if(!note){
        return <NotFoundNote/>
    }
    return (
        <main>
            <Link className='btn-accueil' to={`/`}>
                Accueil
            </Link>
            <h1>Modification</h1>
            
            <FormUpdateNote note={note}/>
        </main>
    );
};

export default NoteUpdate;

interface FormUpdateNoteProps {
    note: Note ;
}

const FormUpdateNote: React.FC<FormUpdateNoteProps> = ({ note }) => {
    const [updatedNote, setUpdatedNote] = useState<Note>({
        uuid: note.uuid,
        title: note.title,
        content: note.content, 
        created_at: note.created_at,
        updated_at: note.updated_at,
    });
    const updateNote = useNoteStore((state) => state.updateNote)
    if(!note){
        return <NotFoundNote/>
    }	

	const noteSubmit = (event_: React.FormEvent) => {
        event_.preventDefault();
        updateNote(updatedNote);
        alert("La note a bien été mise à jour")

    };

	const handleChange = (event_: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event_.target;
        setUpdatedNote((previousNote) => ({
            ...previousNote,
            [name]: value,
        }));
    };
    return(
        <form onSubmit={noteSubmit}>
			<div className='form-title'>
				<h2>Titre : </h2>
				<input className='input-title' type="text" name="title" value={updatedNote.title} onChange={handleChange} />
			</div>
			<textarea id="content" name="content" rows={20} cols={50} value={updatedNote.content} onChange={handleChange}>
    		</textarea>
			<button className='btn-submit' type="submit">Mettre à jour</button>
		</form>
    )
}
