import { useNavigation } from '@react-navigation/native'
import { QrCode, SquareUser } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { Dialog, Text, View } from 'tamagui'

import { useDialogStore } from '@/store/dialog'

export default function ConfirmPresenceDialog() {
  const { isOpen, onClose, type } = useDialogStore()
  const navigation: any = useNavigation()

  const isModalOpen = isOpen && type === 'presence'

  const handleFaceRecognition = () => {
    onClose()

    navigation.navigate('Camera')
  }

  const handleQrCode = () => {
    onClose()

    navigation.navigate('QRCode')
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
          <Dialog.Title
            fontSize={20}
            marginBottom={8}
          >
            Confirmar presença
          </Dialog.Title>

          <View
            flexDirection='row'
            gap={24}
            padding={8}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                flex: 1,
                borderWidth: 1,
                borderRadius: 12,
                padding: 12,
                borderColor: 'rgba(0, 0, 0, 0.3)',
              }}
              onPress={handleQrCode}
            >
              <QrCode
                size={50}
                color='#000'
              />

              <Text
                fontWeight='bold'
                fontSize={12}
              >
                QRcode
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                flex: 1,
                borderWidth: 1,
                borderRadius: 12,
                padding: 12,
                borderColor: 'rgba(0, 0, 0, 0.3)',
              }}
              onPress={handleFaceRecognition}
            >
              <SquareUser
                size={50}
                color='#000'
              />

              <View
                justifyContent='center'
                alignItems='center'
              >
                <Text
                  fontWeight='bold'
                  fontSize={12}
                >
                  Reconhecimento
                </Text>

                <Text
                  fontWeight='bold'
                  fontSize={12}
                >
                  Facial
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
