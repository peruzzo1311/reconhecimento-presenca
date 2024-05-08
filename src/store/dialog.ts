import { create } from 'zustand'

import { Participant } from '@/types'

export type DialogType = 'presence' | 'avatar'

export interface DialogData {
  participant?: Participant
}

interface DialogStore {
  type: DialogType | null
  data: DialogData
  isOpen: boolean
  onOpen: (type: DialogType, data?: DialogData) => void
  onClose: () => void
}

export const useDialogStore = create<DialogStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}))
