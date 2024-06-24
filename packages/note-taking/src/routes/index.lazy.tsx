import { createLazyFileRoute , Link } from '@tanstack/react-router'



import { NoteList } from '../components/note_list'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Toutes les notes</h3>
      <Link to={`/create`}>
        Ajouter une note
      </Link>
      <NoteList/>
    </div>
  )
}
