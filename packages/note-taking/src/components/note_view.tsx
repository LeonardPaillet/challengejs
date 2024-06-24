import type { Note } from '../model/note'


import { Link , useParams } from '@tanstack/react-router'
import MarkdownPreview from '@uiw/react-markdown-preview';
import React from 'react';

import { formatDate } from '../services/utils';
import { useNoteStore } from "../store/note";

import { NotFoundNote } from './not_found';

const NoteView: React.FC = () => {
    const parameters = useParams({ from: '/$uuid/' })
    const getNote = useNoteStore((state)=>state.getNote)
    const note = getNote(parameters.uuid)
    if(!note){
        return <NotFoundNote/>
    }
    return (
        <div>
            <Link to={`/`}>
                Accueil
            </Link>
            <h1>Test</h1>
            {
                note.content && <MarkdownPreview source={note.content}/>
            }
            
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
