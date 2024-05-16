import { NavigationContainer } from '@react-navigation/native'
import { ToastProvider } from '@tamagui/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TamaguiProvider } from 'tamagui'
import config from 'tamagui.config'

interface ProviderProps {
  children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
  const queryClient = new QueryClient()

  return (
    <NavigationContainer>
      <TamaguiProvider
        config={config}
        defaultTheme='light'
      >
        <QueryClientProvider client={queryClient}>
          <ToastProvider
            burntOptions={{ from: 'bottom', shouldDismissByDrag: true }}
          >
            {children}
          </ToastProvider>
        </QueryClientProvider>
      </TamaguiProvider>
    </NavigationContainer>
  )
}
