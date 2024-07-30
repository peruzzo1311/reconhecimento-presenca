import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'

import Camera from '@/app/camera'
import Foto from '@/app/foto'
import Inicio from '@/app/inicio'
import ListaPresenca from '@/app/lista-presenca'
import ListaTreinamentos from '@/app/lista-treinamentos'
import Login from '@/app/login'
import QRCode from '@/app/qrcode'
import { useUserStore } from '@/store/user-store'

export type RootStackParamList = {
  Login: undefined
  Inicio: undefined
  Camera: undefined
  QRCode: undefined
  ListaTreinamentos: {
    type: 'listagem' | 'validacao'
  }
  ListaPresenca: {
    type: 'listagem' | 'validacao'
    title: string
  }
  Foto: {
    photo: string
  }
}

const Stack = createStackNavigator<RootStackParamList>()

export default function RootStack() {
  const { user } = useUserStore()

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      {user ? (
        <>
          <Stack.Screen name='Inicio' component={Inicio} />

          <Stack.Screen
            name='ListaTreinamentos'
            component={ListaTreinamentos}
          />

          <Stack.Screen name='ListaPresenca' component={ListaPresenca} />

          <Stack.Screen name='Camera' component={Camera} />

          <Stack.Screen
            name='Foto'
            // @ts-ignore
            component={Foto}
          />

          <Stack.Screen name='QRCode' component={QRCode} />
        </>
      ) : (
        <>
          <Stack.Screen name='Login' component={Login} />
        </>
      )}
    </Stack.Navigator>
  )
}
