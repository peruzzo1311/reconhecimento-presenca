import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface OfflineStoreProps {
  isOffline: boolean
  setIsOffline: (offline: boolean) => void
}

export const useOfflineStore = create(
  persist<OfflineStoreProps>(
    (set) => ({
      isOffline: false,
      setIsOffline: (offline) => set({ isOffline: offline }),
    }),
    {
      name: 'reconhecimento-presenca-offline-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
