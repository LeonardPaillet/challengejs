import type { Note } from '../model/note'

import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

interface NoteState {
    notes: Array<Note>;
    addNote: (note: Note) => void;
    removeNote: (uuid: Note['uuid']) => void;
    updateNote: (note: Note) => void;
    getNote: (uuid: Note['uuid']) => Note | undefined;
}

export const useNoteStore = create<NoteState>()(
    persist((set, get) => ({
        notes: [],
        addNote: (note: Note) => set((state: NoteState) => {
            note.uuid = uuidv4(),
            note.created_at = new Date();
            return { notes: [...state.notes, note] };
        }),
        removeNote: (uuid: Note['uuid']) => set((state: NoteState) => ({ notes: state.notes.filter((note) => note.uuid !== uuid) })),
        updateNote: (note: Note) => set((state: NoteState) => {
                const oldNote = state.notes.find((n) => n.uuid === note.uuid);

                if (!oldNote) {
                    return state;
                }

                note = { ...oldNote, ...note, updated_at: new Date()};

                const notes = state.notes.map((n) => (n.uuid === note.uuid ? note : n));
                return { notes };
            }),
        getNote: (uuid: Note['uuid']) => {
            const { notes } = get();
            return notes.find((note) => note.uuid === uuid);
        },
    }), {
        name: 'notes-storage',
        storage: createJSONStorage(() => sessionStorage)
      })
);