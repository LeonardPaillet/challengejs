import { createLazyFileRoute , Link } from '@tanstack/react-router'



import { NoteList } from '../components/note_list'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h1>Toutes les notes</h1>
      <Link className='addNote' to={`/create`}>
        Ajouter une note
      </Link>
      <NoteList/>
    </div>
  )
}

