import { NavigationContainer } from '@react-navigation/native'
import { ToastProvider } from '@tamagui/toast'
import { TamaguiProvider } from 'tamagui'
import config from 'tamagui.config'

interface ProviderProps {
  children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
  return (
    <NavigationContainer>
      <TamaguiProvider config={config} defaultTheme='light'>
        <ToastProvider
          burntOptions={{ from: 'bottom', shouldDismissByDrag: true }}
        >
          {children}
        </ToastProvider>
      </TamaguiProvider>
    </NavigationContainer>
  )
}
