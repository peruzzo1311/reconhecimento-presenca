import { FontAwesome } from '@expo/vector-icons'
import { View } from 'tamagui'

import { Header } from '@/components/header'
import { MenuButton } from '@/components/menu-button'

export default function Inicio() {
  return (
    <View flex={1}>
      <Header />

      <View
        flex={1}
        padding={24}
        backgroundColor='white'
      >
        <View
          flexDirection='row'
          justifyContent='space-around'
          alignItems='center'
        >
          <MenuButton
            label='Lista de presença'
            icon={
              <FontAwesome
                name='graduation-cap'
                size={40}
                color='white'
              />
            }
            route='ListaTreinamentos'
          />

          <MenuButton
            label='Consultar presença'
            icon={
              <FontAwesome
                name='users'
                size={40}
                color='white'
              />
            }
            route='ListaTreinamentos'
          />
        </View>
      </View>
    </View>
  )
}
