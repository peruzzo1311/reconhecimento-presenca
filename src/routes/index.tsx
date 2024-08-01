import { createStackNavigator } from '@react-navigation/stack'

import Camera from '@/app/camera'
import Foto from '@/app/foto'
import Inicio from '@/app/inicio'
import ListaPresenca from '@/app/lista-presenca'
import ListaTreinamentos from '@/app/lista-treinamentos'
import Login from '@/app/login'
import QRCode from '@/app/qrcode'
import Sincronizar from '@/app/sincronizar-grupos'
import SincronizarParticipantes from '@/app/sincronizar-participantes'
import { useUserStore } from '@/store/user-store'

const Stack = createStackNavigator()

export default function RootStack() {
  const { user } = useUserStore()

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Inicio' : 'Login'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
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

          <Stack.Screen name='Sincronizar' component={Sincronizar} />

          <Stack.Screen
            name='SincronizarParticipantes'
            component={SincronizarParticipantes}
          />
        </>
      ) : (
        <>
          <Stack.Screen name='Login' component={Login} />
        </>
      )}
    </Stack.Navigator>
  )
}
