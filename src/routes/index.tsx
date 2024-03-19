import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '@/app/login'
import Listapresenca from '@/app/lista-presenca'

export type RootStackParamList = {
  Login: undefined
  ListaPresenca: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='ListaPresenca'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Login'
          component={Login}
        />
        <Stack.Screen
          name='ListaPresenca'
          component={Listapresenca}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
