import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '@/app/login'
import Listapresenca from '@/app/lista-presenca'
import Camera from '@/app/camera'


export type RootStackParamList = {
  Login: undefined
  ListaPresenca: undefined
  Camera: undefined
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
        <Stack.Screen
          name='Camera'
          component={Camera}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
