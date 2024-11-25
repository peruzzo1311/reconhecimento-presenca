import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'

import Camera from '@/app/camera'
import Foto from '@/app/foto'
import ListaPresenca from '@/app/lista-presenca'
import ListaTreinamentos from '@/app/lista-treinamentos'
import Login from '@/app/login'
import QRCode from '@/app/qrcode'
import SincronizarGrupos from '@/app/sincronizar-grupos'
import SincronizarParticipantes from '@/app/sincronizar-participantes'
import TenantScreen from '@/app/tenant'
import { useUserStore } from '@/store/user-store'

const Stack = createStackNavigator()

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      {/* <Stack.Screen name='Inicio' component={Inicio} /> */}

      <Stack.Group
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        <Stack.Screen name='Login' component={Login} />

        <Stack.Screen
          name='TenantScreen'
          component={TenantScreen}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Group>

      <Stack.Screen name='ListaTreinamentos' component={ListaTreinamentos} />

      <Stack.Screen
        name='ListaPresenca'
        // @ts-ignore
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

      <Stack.Screen
        name='QRCode'
        // @ts-ignore
        component={QRCode}
      />

      <Stack.Screen name='Sincronizar' component={SincronizarGrupos} />

      <Stack.Screen
        name='SincronizarParticipantes'
        // @ts-ignore
        component={SincronizarParticipantes}
      />
    </Stack.Navigator>
  )
}
