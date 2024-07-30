import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PresenceProps {
  codCua: number
  tmaCua: number
  participantes: {
    numEmp: number
    tipCol: number
    numCad: number
    datFre: string
    horFre: string
  }
}

interface OfflineStoreProps {
  presences: PresenceProps[]
  addPresence: (presence: PresenceProps) => void
  removePresence: (index: number) => void
  clearPresences: () => void
}

export const useOfflineStore = create(
  persist<OfflineStoreProps>(
    (set) => ({
      presences: [],
      addPresence: (presence) =>
        set((state) => ({ presences: [...state.presences, presence] })),
      removePresence: (index) =>
        set((state) => {
          const newPresences = [...state.presences]
          newPresences.splice(index, 1)

          return { presences: newPresences }
        }),
      clearPresences: () => set({ presences: [] }),
    }),
    {
      name: 'reconhecimento-presenca-offline-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
