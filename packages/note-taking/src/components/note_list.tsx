import type { Note } from '../model/note';

import { Link } from '@tanstack/react-router'
import React from 'react';

import { formatDate } from '../services/utils';
import { useNoteStore } from '../store/note';



export function NoteList(){
    const notes = useNoteStore((state) => state.notes);
    return(
        <div className='list-note'>
            {notes.map((note:Note)=>(
                <NoteCard key={note.uuid} noteComponent={note}/>
            ))}
        </div>
    )
}

interface NoteCardProps {
    noteComponent: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ noteComponent }) => {
    const removeNote = useNoteStore((state) => state.removeNote) 
    const deleteNote = (event_: React.FormEvent)=>{
        event_.preventDefault();
        removeNote(noteComponent.uuid)
    }

    return (
        <div className="note-card">
            <h2>{noteComponent.title}</h2>
            <div>
                <p>Créé le: {formatDate(noteComponent.created_at)}</p>
                {noteComponent.updated_at && (
                    <p>Dernière mise à jour le: {formatDate(noteComponent.updated_at)}</p>
                )}
            </div>
            
            <div className='card-lien'>
                <Link className='lien-ajout' to={`/${noteComponent.uuid}`}>
                    Voir la note
                </Link>
                <button className='delete-btn' onClick={deleteNote}>Supprimer la note</button>
            </div>
        </div>
    );
};


