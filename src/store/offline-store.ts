import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ParticipantePresence, Presence } from '@/types'

interface OfflineStoreProps {
  isOffline: boolean
  presenceOffline: Presence[]
  setIsOffline: (offline: boolean) => void
  addPresenceOffline: (codCua: number, tmaCua: number, participantes: ParticipantePresence) => void
  removeParticipantOffline: (codCua: number, tmaCua: number, numCpf: string | number) => void
  removeAllParticipantsOffline: (codCua: number, tmaCua: number) => void
  clearPresenceOffline: () => void
}

export const useOfflineStore = create(
  persist<OfflineStoreProps>(
    (set) => ({
      isOffline: false,
      presenceOffline: [],
      setIsOffline: (offline) => set({ isOffline: offline }),
      addPresenceOffline: (codCua, tmaCua, participantes) => {
        set((state) => {
          const training = state.presenceOffline.find(
            (p) => p.codCua === codCua && p.tmaCua === tmaCua
          )

          if (training) {
            const newParticipantes = [...training.participantes, participantes]

            const newPresenceList = state.presenceOffline.map((p) => {
              if (p.codCua === codCua && p.tmaCua === tmaCua) {
                return { ...training, participantes: newParticipantes }
              }

              return p
            })

            return { presenceOffline: newPresenceList }
          }

          return {
            presenceOffline: [
              ...state.presenceOffline,
              { codCua, tmaCua, participantes: [participantes] },
            ],
          }
        })
      },
      removeParticipantOffline: (codCua, tmaCua, numCpf) => {
        set((state) => {
          const training = state.presenceOffline.find(
            (p) => p.codCua === codCua && p.tmaCua === tmaCua
          )

          if (training) {
            const newParticipantes = training.participantes.filter((p) => p.numCpf !== numCpf)

            if (newParticipantes.length === 0) {
              const newPresenceList = state.presenceOffline.filter(
                (p) => p.codCua !== codCua && p.tmaCua !== tmaCua
              )

              return { presenceOffline: newPresenceList }
            }

            const newPresenceList = state.presenceOffline.map((p) => {
              if (p.codCua === codCua && p.tmaCua === tmaCua) {
                return { ...training, participantes: newParticipantes }
              }

              return p
            })

            return { presenceOffline: newPresenceList }
          }

          return state
        })
      },
      removeAllParticipantsOffline: (codCua, tmaCua) => {
        set((state) => {
          const newPresenceList = state.presenceOffline.filter(
            (p) => p.codCua !== codCua && p.tmaCua !== tmaCua
          )

          return { presenceOffline: newPresenceList }
        })
      },
      clearPresenceOffline: () => set({ presenceOffline: [] }),
    }),
    {
      name: 'reconhecimento-presenca-offline-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
