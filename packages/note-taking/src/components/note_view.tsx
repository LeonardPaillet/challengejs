import { Link , useParams } from '@tanstack/react-router'
import MarkdownPreview from '@uiw/react-markdown-preview';
import React, { useState } from 'react';

import { formatDate } from '../services/utils';
import { useNoteStore } from "../store/note";

import { NotFoundNote } from './not_found';

const NoteView: React.FC = () => {
    const [stateContent, setStateContent] = useState('Markdown');
    const [positionBall, setPositionBall] = useState('left');
    const parameters = useParams({ from: '/$uuid/' })
    const getNote = useNoteStore((state)=>state.getNote)
    const note = getNote(parameters.uuid)
    if(!note){
        return <NotFoundNote/>
    }
    const toggleContent = () => {
        if (stateContent === "Markdown") {
            setStateContent("HTML");
            setPositionBall("right");
        } else {
            setStateContent("Markdown");
            setPositionBall("left");
        }
    };
    return (
        <main>
            <Link className='btn-accueil' to={`/`}>
                Accueil
            </Link>
            <h1>{note.title}</h1>
            <div className='note-view'>
                <MarkdownHtml stateContent={stateContent} positionBall={positionBall} toggleContent={toggleContent}/>
                <div>
                    {
                        stateContent === "Markdown" ? (
                            <MarkdownPreview className='markdown-preview' source={note.content}/>
                        ) :
                        (
                            note.content
                        )
                    }
                    
                    <p>Créer le {formatDate(note?.created_at)}</p>
                    {
                        note?.updated_at ? (
                            <p>Mise à jour le {formatDate(note.updated_at)}</p>
                        ) :
                        null
                    }
                </div>
            </div>
                
            
            <Link className='btn-modif' to={`/${parameters.uuid}/update`}>
                Modifier
            </Link>
        </main>
    );
};

export default NoteView;

interface MarkdownHtmlProps {
    stateContent: string;
    positionBall: string;
    toggleContent: () => void;
  }

  const MarkdownHtml: React.FC<MarkdownHtmlProps> =({ stateContent, positionBall, toggleContent })=>{
    return(
        <div onClick={toggleContent} className={`switch ${positionBall}`}>
            <span className={`switch-ball ${positionBall}`}></span>
            <p className={`format ${positionBall}`}>{stateContent}</p>
        </div>
    )
}
