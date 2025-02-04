import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { X } from 'lucide-react-native'
import { useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Button, Dialog, ListItem, Separator, View } from 'tamagui'

import getParticipantes from '@/api/get-participantes'
import getTreinamentos from '@/api/get-treinamentos'
import { useDialogStore } from '@/store/dialog'
import { useOfflineStore } from '@/store/offline-store'
import { useTrainingStore } from '@/store/treinamento-store'
import { useUserStore } from '@/store/user-store'

export default function MenuOptionsDialog() {
  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onClose, type } = useDialogStore()
  const isModalOpen = isOpen && type === 'menu-options'
  const navigation = useNavigation() as any

  const { clearUser, prodDomain } = useUserStore()
  const { isOffline } = useOfflineStore()
  const { setTrainingList } = useTrainingStore()

  if (!isModalOpen) {
    return null
  }

  const fetchTreinamentos = async () => {
    setIsLoading(true)

    try {
      const treinamentosOffline = []
      const treinamentos = await getTreinamentos({ tenant: prodDomain })

      if (!treinamentos) {
        return
      }

      for (let i = 0; i < treinamentos.length; i++) {
        const treinamento = treinamentos[i]
        const participantes = await getParticipantes({
          codCua: treinamento.codCua,
          tmaCua: treinamento.tmaCua,
          tenant: prodDomain,
        })

        if (!participantes) {
          return
        }

        treinamentosOffline.push(participantes)
      }

      setTrainingList(treinamentosOffline)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    clearUser()
    onClose()

    navigation.navigate('Login')
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

          <Dialog.Close opacity={isLoading ? 0.2 : 1} disabled={isLoading} asChild>
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
              <ActivityIndicator />
            </View>
          ) : (
            <View gap={4}>
              <Separator />

              <TouchableOpacity disabled={isOffline} onPress={fetchTreinamentos}>
                <ListItem
                  icon={<MaterialIcons name='download' size={24} color='black' />}
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

              <TouchableOpacity onPress={handleLogout}>
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
