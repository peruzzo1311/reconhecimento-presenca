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
import { useUserStore } from '@/store/user-store'
import { Participant } from '@/types'

export type RootStackParamList = {
  Login: undefined
  Inicio: undefined
  ListaTreinamentos: {
    type: 'listagem' | 'validacao'
  }
  ListaPresenca: {
    type: 'listagem' | 'validacao'
    title: string
  }
  Camera: {
    participant?: Participant
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
          <Stack.Screen
            name='Inicio'
            component={Inicio}
          />

          <Stack.Screen
            name='ListaTreinamentos'
            component={ListaTreinamentos}
          />

          <Stack.Screen
            name='ListaPresenca'
            component={ListaPresenca}
          />

          <Stack.Screen
            name='Camera'
            // @ts-ignore
            component={Camera}
          />

          <Stack.Screen
            name='Foto'
            // @ts-ignore
            component={Foto}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Login'
            component={Login}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
