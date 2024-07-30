import { Avatar, Dialog } from 'tamagui'

import { useDialogStore } from '@/store/dialog'
import { Participant } from '@/types'

export default function ShowAvatarDialog() {
  const { isOpen, onClose, type, data } = useDialogStore()

  const isModalOpen = isOpen && type === 'avatar'
  const { participant } = data as { participant: Participant }

  if (!isModalOpen) {
    return null
  }

  return (
    <Dialog modal disableRemoveScroll open={isModalOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          key='overlay'
          animation='lazy'
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          onPress={onClose}
        />

        <Dialog.Content
          bordered
          elevate
          key='content'
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          padding={0}
          size='$20'
          circular
        >
          <Avatar size='$20' circular>
            <Avatar.Image
              source={{
                uri: `data:image/jpeg;base64,${participant.fotCol}`,
              }}
            />

            <Avatar.Fallback delayMs={600} backgroundColor='gray4' />
          </Avatar>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
