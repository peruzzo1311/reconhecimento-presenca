import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TamaguiProvider, View } from 'tamagui'

import RootStack from './src/routes'
import config from './tamagui.config'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@/components/header'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <NavigationContainer>
      <TamaguiProvider config={config}>
        <StatusBar barStyle='light-content' />

        <View
          flex={1}
          backgroundColor='white'
        >
          <Header />

          <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <RootStack />
          </SafeAreaView>
        </View>
      </TamaguiProvider>
    </NavigationContainer>
  )
}
