import { create } from 'zustand'

import { Training } from '@/types'

interface TrainingStoreProps {
  training: Training | null
  setTraining: (training: Training) => void
  setParticipantPresence: (cpf: string) => void
  clearTraining: () => void
}

export const useTrainingStore = create<TrainingStoreProps>((set) => ({
  training: null,
  setTraining: (training) => set({ training }),
  setParticipantPresence: (cpf: string) => {
    set((state) => {
      if (!state.training) {
        return state
      }

      const newTraining = { ...state.training }
      const participant = newTraining.participantes.find(
        (p) => p.numCpf === cpf
      )

      if (participant) {
        participant.isPresent = true
      }

      return { training: newTraining }
    })
  },
  clearTraining: () => set({ training: null }),
}))
