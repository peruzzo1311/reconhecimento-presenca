import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Participant, Training } from '@/types'

interface TrainingStoreProps {
  trainingList: Training[]
  setTrainingList: (trainings: Training[]) => void
  selectedTraining: Training | null
  setSelectedTraining: (training: Training | null) => void
  selectedParticipant: Participant | null
  setSelectedParticipant: (participant: Participant | null) => void
  setPresence: (participant: Participant) => void
}

export const useTrainingStore = create(
  persist<TrainingStoreProps>(
    (set) => ({
      trainingList: [],
      selectedTraining: null,
      selectedParticipant: null,
      setTrainingList: (trainings) => set({ trainingList: trainings }),
      setSelectedTraining: (selectedTraining) => set({ selectedTraining }),
      setSelectedParticipant: (selectedParticipant) =>
        set({ selectedParticipant }),
      setPresence: (participant) => {
        set((state) => {
          const training = state.selectedTraining

          if (!training) {
            return state
          }

          const updatedParticipants = training.participantes.map((p) => {
            if (p.numCad === participant.numCad) {
              return participant
            }

            return p
          })

          return {
            selectedTraining: {
              ...training,
              participantes: updatedParticipants,
            },
          }
        })
      },
    }),
    {
      name: 'reconhecimento-presenca-training-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
