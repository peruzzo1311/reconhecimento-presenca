import { create } from 'zustand'

import { Participants } from '@/types'

export interface PresenceDialogProps {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  participant: Participants
}

interface PresenceDialogStoreProps {
  openDialog: boolean
  participant: Participants
  setOpenDialog: (open: boolean) => void
  setParticipant: (participant: Participants) => void
}

export const usePresenceDialogStore = create<PresenceDialogStoreProps>(
  (set) => ({
    openDialog: false,
    participant: {} as Participants,
    setOpenDialog: (open) => set({ openDialog: open }),
    setParticipant: (participant) => set({ participant }),
  })
)
