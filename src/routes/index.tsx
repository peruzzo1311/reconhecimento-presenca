import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'

import Home from '@/app/home'
import ListaCurso from '@/app/lista-curso'
import Listapresenca from '@/app/lista-presenca'
import Login from '@/app/login'
import { useUserStore } from '@/store/user-store'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
  ListaPresenca: undefined
  ListaCurso: {
    type: 'listagem' | 'validacao'
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
            component={Listapresenca}
          />

          <Stack.Screen
            name='ListaCurso'
            component={ListaCurso}
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
