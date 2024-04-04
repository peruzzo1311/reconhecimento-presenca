import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Button, Dialog, View } from 'tamagui'

import { useDialogStore } from '@/store/dialog'
import { Participants } from '@/types'

export default function ConfirmPresenceDialog() {
  const { isOpen, onClose, type, data } = useDialogStore()
  const navigation: any = useNavigation()

  const isModalOpen = isOpen && type === 'presence'
  const { participant } = data as { participant: Participants }

  const handleConfirm = () => {
    onClose()

    navigation.navigate('Camera', {
      participants: [data.participant],
    })
  }

  if (!isModalOpen) {
    return null
  }

  return (
    <Dialog
      modal
      disableRemoveScroll
      open={isModalOpen}
      onOpenChange={onClose}
    >
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
            <TouchableOpacity onPress={onClose}>
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
