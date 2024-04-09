import { create } from 'zustand'

import { Participant, Training } from '@/types'

interface TrainingStoreProps {
  training: Training | null
  setTraining: (training: Training) => void
  setParticipantPresence: (participant: Participant) => void
  clearTraining: () => void
}

export const useTrainingStore = create<TrainingStoreProps>((set) => ({
  training: null,
  setTraining: (training) => set({ training }),
  setParticipantPresence: (participant) => {
    set((state) => {
      if (!state.training) {
        return state
      }

      const training = { ...state.training }
      const participants = training.participantes.map((p) => {
        if (p.numCpf === participant.numCpf) {
          return { ...p, present: !p.isPresent }
        }

        return p
      })

      return { training: { ...training, participants } }
    })
  },
  clearTraining: () => set({ training: null }),
}))
