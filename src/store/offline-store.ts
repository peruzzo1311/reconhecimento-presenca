import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Presence } from '@/types'

interface OfflineStoreProps {
  isOffline: boolean
  presenceOffline: Presence[]
  setIsOffline: (offline: boolean) => void
  setPresenceOffline: (presence: Presence[]) => void
}

export const useOfflineStore = create(
  persist<OfflineStoreProps>(
    (set) => ({
      isOffline: false,
      presenceOffline: [],
      setIsOffline: (offline) => set({ isOffline: offline }),
      setPresenceOffline: (presence) => set({ presenceOffline: presence }),
    }),
    {
      name: 'reconhecimento-presenca-offline-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
