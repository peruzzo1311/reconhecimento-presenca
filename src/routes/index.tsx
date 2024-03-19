import { createStackNavigator } from '@react-navigation/stack'

import Home from '@/app/home'
import Login from '@/app/login'
import { useUserStore } from '@/store/user-store'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
  // Details: { name: string };
}

const Stack = createStackNavigator<RootStackParamList>()

export default function RootStack() {
  const { user } = useUserStore()

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      {user ? (
        <>
          <Stack.Screen
            name='Home'
            component={Home}
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
