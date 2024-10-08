import { Feather } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Network from 'expo-network'
import { TouchableOpacity } from 'react-native'
import { Image, View } from 'tamagui'

import { useDialogStore } from '@/store/dialog'
import { useOfflineStore } from '@/store/offline-store'

export function Header() {
  const { onOpen } = useDialogStore()
  const { setIsOffline } = useOfflineStore()

  const handleOpenMenuOptions = async () => {
    const networkState = await Network.getNetworkStateAsync()
    const isConnected = networkState.isConnected

    if (!isConnected) {
      setIsOffline(true)
    } else {
      setIsOffline(false)
    }

    onOpen('menu-options', {})
  }

  return (
    <View backgroundColor='#0171BB'>
      <View height={Constants.statusBarHeight} />

      <View
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        paddingHorizontal={20}
        height={60}
      >
        <View width='100%' maxWidth={150}>
          <Image
            source={require('@/assets/images/logo.png')}
            width='100%'
            height='100%'
            objectFit='contain'
          />
        </View>

        <TouchableOpacity
          onPress={handleOpenMenuOptions}
          style={{ padding: 8 }}
        >
          <Feather name='menu' size={30} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  )
}
