import { Feather } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { TouchableOpacity } from 'react-native'
import { Image, View } from 'tamagui'

import { useDialogStore } from '@/store/dialog'

export function Header() {
  const { onOpen } = useDialogStore()

  const handleOpenMenuOptions = () => {
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
            resizeMode='contain'
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
