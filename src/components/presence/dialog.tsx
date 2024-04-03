import { TouchableOpacity } from 'react-native'
import { Button, Dialog, View } from 'tamagui'

import { Participants } from '@/types'

interface PresenceDialogProps {
  open: boolean
  onClose: (open: boolean) => void
  participant: Participants
  navigation: any
}

export default function PresenceDialog({
  open,
  onClose,
  participant,
  navigation,
}: PresenceDialogProps) {
  const handleConfirm = () => {
    onClose(false)

    participant.isPresent = !participant.isPresent
    navigation.navigate('Camera', {
      participants: [participant],
    })
  }

  return (
    <Dialog
      modal
      disableRemoveScroll
      open={open}
      onOpenChange={onClose}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          key='overlay'
          animation='lazy'
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          onPress={() => onClose(false)}
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
          width={350}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        >
          <Dialog.Title>Validação manual</Dialog.Title>

          <Dialog.Description>
            Você deseja validar manualmente a presença de {participant.nomFun}?
          </Dialog.Description>

          <View
            marginTop={12}
            flexDirection='row'
            justifyContent='flex-end'
            gap={12}
          >
            <TouchableOpacity onPress={() => onClose(false)}>
              <Button pointerEvents='none'>Cancelar</Button>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleConfirm}>
              <Button
                pointerEvents='none'
                backgroundColor='$primary600'
                color='white'
              >
                Validar
              </Button>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
