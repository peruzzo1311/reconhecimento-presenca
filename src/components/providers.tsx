import { NavigationContainer } from '@react-navigation/native'
import { config } from '@tamagui/config/v3'
import { ToastProvider } from '@tamagui/toast'
import { createTamagui, TamaguiProvider } from 'tamagui'

export const tamaguiConfig = createTamagui(config)

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NavigationContainer>
      <TamaguiProvider config={tamaguiConfig}>
        <ToastProvider
          burntOptions={{ from: 'bottom', shouldDismissByDrag: true }}
        >
          {children}
        </ToastProvider>
      </TamaguiProvider>
    </NavigationContainer>
  )
}
