import { create } from 'zustand'

import { Participants } from '@/types'

export interface PresenceListProps {
  participants: Participants[]
}

interface PresenceListStoreProps {
  participants: Participants[]
  setParticipants: (participants: Participants[]) => void
  confirmPresence: (cpf: string) => void
}

export const usePresenceListStore = create<PresenceListStoreProps>((set) => ({
  participants: [],
  setParticipants: (participants) => set({ participants }),
  confirmPresence: (cpf) => {
    set((state) => ({
      participants: state.participants.map((participant) =>
        participant.numCpf === cpf
          ? { ...participant, isPresent: true }
          : participant
      ),
    }))
  },
}))
