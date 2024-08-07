import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Training } from '@/types'

interface TrainingStoreProps {
  trainingList: Training[]
  setTrainingList: (trainings: Training[]) => void
}

export const useTrainingStore = create(
  persist<TrainingStoreProps>(
    (set) => ({
      trainingList: [],
      setTrainingList: (trainings) => set({ trainingList: trainings }),
    }),
    {
      name: 'reconhecimento-presenca-training-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
