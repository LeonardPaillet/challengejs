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
			<div>
				<h2>Titre : </h2>
				<input type="text" name="title" value={note.title} onChange={handleChange} />
			</div>
			<textarea id="content" name="content" rows={4} cols={50} value={note.content} onChange={handleChange}>
    		</textarea>
			<button type="submit">Ajouter</button>
		</form>
	);
}