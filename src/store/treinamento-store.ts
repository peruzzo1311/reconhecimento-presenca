import { create } from 'zustand'

import { Training } from '@/types'

interface TrainingStoreProps {
  training: Training | null
  setTraining: (training: Training) => void
  setParticipantPresence: (id: number) => void
  clearTraining: () => void
}

export const useTrainingStore = create<TrainingStoreProps>((set) => ({
  training: null,
  setTraining: (training) => set({ training }),
  setParticipantPresence: (id: number) => {
    set((state) => {
      if (!state.training) {
        return state
      }

      const newTraining = { ...state.training }
      const participant = newTraining.participantes.find((p) => p.numCad === id)

      if (participant) {
        participant.isPresent = true
      }

      return { training: newTraining }
    })
  },
  clearTraining: () => set({ training: null }),
}))
