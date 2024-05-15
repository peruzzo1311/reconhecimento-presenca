import { Feather } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { TouchableOpacity } from 'react-native'
import { Image, View } from 'tamagui'

import { useUserStore } from '@/store/user-store'

export function Header() {
  const { user, clearUser } = useUserStore()

  const handleLogout = () => clearUser()

  return (
    <View backgroundColor='#0171BB'>
      <View height={Constants.statusBarHeight} />

      {user && (
        <View
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          paddingHorizontal={20}
          height={60}
        >
          <View
            width='100%'
            maxWidth={150}
          >
            <Image
              source={require('@/assets/images/logo.png')}
              width='100%'
              height='100%'
              resizeMode='contain'
            />
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            style={{ padding: 8 }}
          >
            <Feather
              name='log-out'
              size={30}
              color='white'
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
