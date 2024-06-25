import { createLazyFileRoute } from '@tanstack/react-router';

import NoteView from '../../components/note_view';

export const Route = createLazyFileRoute('/$uuid/')({
    component: NoteView
});

