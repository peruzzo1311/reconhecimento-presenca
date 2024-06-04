import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Training } from '@/types'

interface TrainingStoreProps {
  trainingList: Training[]
  setTrainingList: (trainings: Training[]) => void

  selectedTraining: Training | null
  setSelectedTraining: (training: Training | null) => void

  setParticipantPresence: (
    trainingId: number,
    participantId: number,
    presence: boolean
  ) => void
}

export const useTrainingStore = create(
  persist<TrainingStoreProps>(
    (set) => ({
      trainingList: [],
      setTrainingList: (trainings) => set({ trainingList: trainings }),

      selectedTraining: null,
      setSelectedTraining: (selectedTraining) => set({ selectedTraining }),

      setParticipantPresence: (trainingId, participantId, presence) => {
        set((state) => {
          const trainingIndex = state.trainingList.findIndex(
            (training) => training.codCua === trainingId
          )
          const participantIndex = state.trainingList[
            trainingIndex
          ].participantes.findIndex(
            (participant) => participant.numCad === participantId
          )

          state.trainingList[trainingIndex].participantes[
            participantIndex
          ].isPresent = presence

          return { trainingList: state.trainingList }
        })
      },
    }),
    {
      name: 'reconhecimento-presenca-training-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
