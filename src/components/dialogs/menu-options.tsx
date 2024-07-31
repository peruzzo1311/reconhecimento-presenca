import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { X } from 'lucide-react-native'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Button,
  Dialog,
  ListItem,
  Separator,
  Spinner,
  View,
  Text,
} from 'tamagui'

import getColaboradores from '@/api/get-colaboradores'
import { useDialogStore } from '@/store/dialog'
import { useOfflineStore } from '@/store/offline-store'
import { useUserStore } from '@/store/user-store'

export default function MenuOptionsDialog() {
  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onClose, type } = useDialogStore()
  const { clearUser } = useUserStore()
  const { setActiveEmployees } = useOfflineStore()
  const navigation = useNavigation() as any
  const isModalOpen = isOpen && type === 'menu-options'

  const handleDownloadColaboradores = async () => {
    try {
      setIsLoading(true)
      const res = await getColaboradores()

      if (!res.colaboradores) {
        return
      }

      setActiveEmployees(
        Array.isArray(res.colaboradores)
          ? res.colaboradores
          : [res.colaboradores]
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

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
          gap='$4'
          width='100%'
          maxWidth={350}
          backgroundColor='white'
        >
          <Dialog.Title fontSize='$7' fontWeight='400'>
            Opções
          </Dialog.Title>

          <Dialog.Close asChild>
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
            <View
              alignItems='center'
              justifyContent='center'
              flexDirection='row'
              gap={8}
            >
              <Spinner color='$primary600' />

              <Text fontSize='$5'>Carregando...</Text>
            </View>
          ) : (
            <View gap={4}>
              <Separator />

              <TouchableOpacity onPress={handleDownloadColaboradores}>
                <ListItem
                  icon={
                    <MaterialIcons name='download' size={24} color='black' />
                  }
                  fontSize='$5'
                  fontWeight={400}
                >
                  Lista de colaboradores
                </ListItem>
              </TouchableOpacity>

              <Separator />

              <TouchableOpacity
                onPress={() => {
                  onClose()
                  navigation.navigate('Sincronizar')
                }}
              >
                <ListItem
                  icon={<MaterialIcons name='sync' size={24} color='black' />}
                  fontSize='$5'
                  fontWeight={400}
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
