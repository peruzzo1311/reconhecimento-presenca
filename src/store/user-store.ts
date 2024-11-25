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
  password?: string
  tenant?: string
}

interface stateProps {
  user: User | null
  tenant: string
  prodDomain: string
  homDomain: string
  setUser: (user: User) => void
  setTenant: (tenant: string) => void
  setProdDomain: (prodDomain: string) => void
  setHomDomain: (homDomain: string) => void
  clearUser: () => void
}

export const useUserStore = create(
  persist<stateProps>(
    (set) => ({
      user: null,
      tenant: '',
      prodDomain: '',
      homDomain: '',
      setUser: (user: User) => set({ user }),
      setTenant: (tenant: string) => set({ tenant }),
      setProdDomain: (prodDomain: string) => set({ prodDomain }),
      setHomDomain: (homDomain: string) => set({ homDomain }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'reconhecimento-presenca-user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
