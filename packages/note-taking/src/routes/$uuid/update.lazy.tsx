import { createLazyFileRoute } from '@tanstack/react-router'

import NoteUpdate from '../../components/note_update'

export const Route = createLazyFileRoute('/$uuid/update')({
  component: NoteUpdate
})