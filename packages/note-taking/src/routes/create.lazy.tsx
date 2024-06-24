import { createLazyFileRoute, Link } from '@tanstack/react-router'

import { FormNote } from '../components/form_note'

export const Route = createLazyFileRoute('/create')({
  component: () => 
  <div>
    <Link to={`/`}>
      Accueil
    </Link>
    <h1>Création de note</h1>
    <FormNote/>
      
  </div>
})