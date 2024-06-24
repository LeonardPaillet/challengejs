import { createLazyFileRoute, Link } from '@tanstack/react-router'

import { FormNote } from '../components/form_note'

export const Route = createLazyFileRoute('/create')({
  component: () => 
  <main>
    <Link className='btn-accueil' to={`/`}>
      Accueil
    </Link>
    <h1>Création de note</h1>
    <FormNote/>
      
  </main>
})