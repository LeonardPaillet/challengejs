import type { Note } from '../model/note'


import { Link , useParams } from '@tanstack/react-router'
import React from 'react';

import { formatDate } from '../services/utils';
import { useNoteStore } from "../store/note";

const NoteView: React.FC = () => {
    const parameters = useParams({ from: '/$uuid/' })
    const getNote = useNoteStore((state)=>state.getNote)
    const note : Note|undefined = getNote(parameters.uuid)
    return (
        <div>
            <Link to={`/`}>
                Accueil
            </Link>
            <h1>Test</h1>
            <p>{note?.content}</p>
            <p>Créer le {formatDate(note?.created_at)}</p>
            {
                note?.updated_at ? (
                    <p>Mise à jour le {formatDate(note.updated_at)}</p>
                ) :
                null
            }
            <Link to={`/${parameters.uuid}/update`}>
                Modifier
            </Link>
        </div>
    );
};

export default NoteView;
