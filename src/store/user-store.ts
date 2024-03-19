import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface User {
  admin: boolean
  changePassword: boolean
  fullName: string
  id: string
  photo: string
  photoUrl: string
  properties: {
    name: string
    value: string
  }[]
  username: string
}

interface stateProps {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create(
  persist<stateProps>(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'reconhecimento-presenca-user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
