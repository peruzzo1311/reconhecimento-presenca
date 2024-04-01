import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'

import Camera from '@/app/camera'
import Home from '@/app/home'
import ListaPresenca from '@/app/lista-presenca'
import ListaTreinamentos from '@/app/lista-treinamentos'
import Login from '@/app/login'
import { useUserStore } from '@/store/user-store'
import { Participants } from '@/types'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
  ListaPresenca: {
    type: 'listagem' | 'validacao'
    training: Participants
  }
  ListaTreinamentos: {
    type: 'listagem' | 'validacao'
  }
  Camera: undefined
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
      }}
    >
      {user ? (
        <>
          <Stack.Screen
            name='Home'
            component={Home}
          />

          <Stack.Screen
            name='ListaPresenca'
            component={ListaPresenca}
          />

          <Stack.Screen
            name='ListaTreinamentos'
            component={ListaTreinamentos}
          />

          <Stack.Screen
            name='Camera'
            component={Camera}
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
