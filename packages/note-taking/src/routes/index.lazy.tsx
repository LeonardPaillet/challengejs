import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const notes = useNoteStore((state) => state.notes);
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}