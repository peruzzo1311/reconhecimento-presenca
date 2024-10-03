import 'react-native-gesture-handler'

import { ToastViewport } from '@tamagui/toast'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import DialogProviders from '@/components/dialogs/provider'
import { Providers } from '@/components/providers'
import Toast from '@/components/toast'
import RootStack from '@/routes'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterSemibold: require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  const keyboard = useAnimatedKeyboard()
  useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(keyboard.height.value, {
          restDisplacementThreshold: 5,
          restSpeedThreshold: 5,
        }),
      },
    ],
  }))

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Providers>
      <StatusBar
        barStyle='light-content'
        backgroundColor='#0171BB'
        translucent
      />

      <DialogProviders />

      <RootStack />

      <ToastViewport
        flexDirection='column-reverse'
        top={40}
        left={4}
        right={4}
      />

      <Toast />
    </Providers>
  )
}
