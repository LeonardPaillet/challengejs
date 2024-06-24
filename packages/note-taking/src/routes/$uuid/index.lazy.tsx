import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';

import NoteView from '../../components/note_view';

export const Route = createLazyFileRoute('/$uuid/')({
    component: NoteView
});

