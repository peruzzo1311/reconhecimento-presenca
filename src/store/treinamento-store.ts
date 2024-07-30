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
  setParticipantPresence: (
    trainingId: number,
    classId: number,
    participantId: number
  ) => void
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
      setParticipantPresence: (trainingId, classId, participantId) => {
        set((state) => {
          const trainingIndex = state.trainingList.findIndex(
            (training) =>
              training.codCua === trainingId && training.tmaCua === classId
          )

          const participantIndex = state.trainingList[
            trainingIndex
          ].participantes.findIndex(
            (participant) => participant.numCad === participantId
          )

          state.trainingList[trainingIndex].participantes[
            participantIndex
          ].staFre = 'Presente'

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
