import type { Note } from '../model/note'

import { useState } from 'react';

import { useNoteStore } from "../store/note";

export function FormNote() {
	const [note, setNote] = useState<Note>({
        uuid: '',
        title: '',
        content: '',
        created_at: new Date(),
        updated_at: undefined,
    });
	const addNote = useNoteStore((state) => state.addNote)
	const getNote = useNoteStore((state)=>state.getNote)

	const noteSubmit = (event_: React.FormEvent) => {
        event_.preventDefault();
        if(!note.title || !note.content){
            alert("Champs vide")
            return
        }
        addNote(note);
		console.log(getNote(note.uuid))
		
        setNote({
            uuid: '',
            title: '',
            content: '',
            created_at: new Date(),
            updated_at: undefined,
        });

    };

	const handleChange = (event_: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event_.target;
        setNote((previousNote) => ({
            ...previousNote,
            [name]: value,
        }));
    };
	return (
		<form onSubmit={noteSubmit}>
			<div className='form-title'>
				<h2>Titre : </h2>
				<input type="text" name="title" className='input-title' value={note.title} onChange={handleChange} />
			</div>
			<textarea id="content" name="content" rows={20} cols={50} value={note.content} onChange={handleChange}>
    		</textarea>
			<button className='btn-submit' type="submit">Ajouter</button>
		</form>
	);
}