import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { X } from 'lucide-react-native'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, Dialog, ListItem, Progress, Separator, View } from 'tamagui'

import getParticipantes from '@/api/get-participantes'
import getTreinamentos from '@/api/get-treinamentos'
import { useDialogStore } from '@/store/dialog'
import { useOfflineStore } from '@/store/offline-store'
import { useUserStore } from '@/store/user-store'
import { Training } from '@/types'
import { useTrainingStore } from '@/store/treinamento-store'

export default function MenuOptionsDialog() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const { isOpen, onClose, type } = useDialogStore()
  const isModalOpen = isOpen && type === 'menu-options'
  const navigation = useNavigation() as any

  const { clearUser } = useUserStore()
  const { isOffline } = useOfflineStore()
  const { setTrainingList } = useTrainingStore()

  if (!isModalOpen) {
    return null
  }

  const downloadTreinamentos = async () => {
    setIsLoading(true)

    try {
      const treinamentosOffline = [] as Training[]
      const treinamentos = await getTreinamentos()

      if (!treinamentos) {
        return
      }

      for (const treinamento of treinamentos) {
        const participantes = await getParticipantes({
          codCua: treinamento.codCua,
          tmaCua: treinamento.tmaCua,
        })

        if (!participantes) {
          return
        }

        treinamentosOffline.push(participantes)

        setProgress(
          Math.round((treinamentosOffline.length / treinamentos.length) * 100)
        )
      }

      setTrainingList(treinamentosOffline)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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
          gap='$4'
          width='100%'
          maxWidth={300}
          backgroundColor='white'
        >
          <Dialog.Title fontSize='$7' fontWeight='400'>
            {isLoading ? 'Baixando...' : 'Opções'}
          </Dialog.Title>

          <Dialog.Close
            opacity={isLoading ? 0.2 : 1}
            disabled={isLoading}
            asChild
          >
            <Button
              position='absolute'
              top='$3'
              right='$3'
              size='$2'
              backgroundColor='$gray4'
              icon={<X color='black' size={16} />}
              circular
            />
          </Dialog.Close>

          {isLoading ? (
            <View alignItems='center' justifyContent='center'>
              <Progress value={progress}>
                <Progress.Indicator
                  backgroundColor='#0171BB'
                  animation='lazy'
                />
              </Progress>
            </View>
          ) : (
            <View gap={4}>
              <Separator />

              <TouchableOpacity
                disabled={isOffline}
                onPress={downloadTreinamentos}
              >
                <ListItem
                  icon={
                    <MaterialIcons name='download' size={24} color='black' />
                  }
                  fontSize='$5'
                  fontWeight={400}
                  opacity={isOffline ? 0.5 : 1}
                  backgroundColor='white'
                  disabled
                >
                  Baixar treinamentos
                </ListItem>
              </TouchableOpacity>

              <Separator />

              <TouchableOpacity
                onPress={() => {
                  onClose()
                  navigation.navigate('Sincronizar')
                }}
                disabled={isOffline}
              >
                <ListItem
                  icon={<MaterialIcons name='sync' size={24} color='black' />}
                  fontSize='$5'
                  fontWeight={400}
                  opacity={isOffline ? 0.5 : 1}
                  backgroundColor='white'
                >
                  Sincronizar
                </ListItem>
              </TouchableOpacity>

              <Separator />

              <TouchableOpacity
                onPress={() => {
                  onClose()
                  clearUser()
                }}
              >
                <ListItem
                  icon={<MaterialIcons name='logout' size={24} color='black' />}
                  fontSize='$5'
                  fontWeight={400}
                  backgroundColor='white'
                >
                  Sair
                </ListItem>
              </TouchableOpacity>
            </View>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
