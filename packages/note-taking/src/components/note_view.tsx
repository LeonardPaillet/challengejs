import type { Note } from '../model/note'


import { Link , useParams } from '@tanstack/react-router'
import MarkdownPreview from '@uiw/react-markdown-preview';
import React, { useState } from 'react';

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
        <main>
            <Link className='btn-accueil' to={`/`}>
                Accueil
            </Link>
            <h1>{note.title}</h1>
            <MarkdownHtml/>
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
        </main>
    );
};

export default NoteView;

function MarkdownHtml(){
    const [stateContent, setStateContent] = useState('Markdown')
    const [positionBall, setPositionBall] = useState('left')
    const toggleContent = ()=>{
        if(stateContent === "Markdown"){
            setStateContent("HTML")
            setPositionBall("right")
        }
        else{
            setStateContent("Markdown")
            setPositionBall("left")
        }
        
    }
    return(
        <div onClick={toggleContent} className={`switch ${positionBall}`}>
            <span className={`switch-ball ${positionBall}`}></span>
            <p className={`format ${positionBall}`}>{stateContent}</p>
        </div>
    )
}
