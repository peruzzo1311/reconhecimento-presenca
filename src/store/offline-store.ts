import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ParticipantOffline {
  numEmp: number
  tipCol: number
  numCad: number
  nomFun: string
  datFre: string
  horFre: string
}

export interface Presence {
  codCua: number
  tmaCua: number
  participante: ParticipantOffline
}

interface ActiveEmployee {}

interface OfflineStoreProps {
  presences: Presence[]
  activeEmployees: ActiveEmployee[]
  setActiveEmployees: (employees: ActiveEmployee[]) => void
  addPresence: (presence: Presence) => void
  removePresence: (item: ParticipantOffline) => void
  clearPresences: () => void
}

export const useOfflineStore = create(
  persist<OfflineStoreProps>(
    (set) => ({
      presences: [],
      activeEmployees: [],
      setActiveEmployees: (employees) => set({ activeEmployees: employees }),
      addPresence: (presence) =>
        set((state) => ({ presences: [...state.presences, presence] })),
      removePresence: (item) =>
        set((state) => ({
          presences: state.presences.filter(
            (participant) => participant.participante !== item
          ),
        })),
      clearPresences: () => set({ presences: [] }),
    }),
    {
      name: 'reconhecimento-presenca-offline-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
