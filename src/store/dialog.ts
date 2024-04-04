import { create } from 'zustand'

import { Participants } from '@/types'

export type DialogType = 'presence' | 'avatar'

export interface DialogData {
  participant?: Participants
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
