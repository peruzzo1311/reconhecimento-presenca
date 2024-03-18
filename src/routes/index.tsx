import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '@/app/login'

export type RootStackParamList = {
  Login: undefined
  // Details: { name: string };
}

const Stack = createStackNavigator<RootStackParamList>()

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Login'
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
