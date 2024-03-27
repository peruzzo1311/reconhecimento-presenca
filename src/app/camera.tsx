import { CameraType, Camera as ExpoCamera } from 'expo-camera'
import { Button, Text, View } from 'tamagui'

import { HeaderNavigation } from '@/components/header-navigation'

export default function Camera({ navigation }: any) {
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions()

  if (!permission || !permission.granted) {
    return (
      <View
        flex={1}
        backgroundColor='white'
      >
        <Text>Requesting camera permission...</Text>
        <Button onPress={requestPermission}>Request permission</Button>
      </View>
    )
  }

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <HeaderNavigation
        navigation={navigation}
        title='Camera'
      />

      <ExpoCamera
        style={{ flex: 1 }}
        type={CameraType.front}
      />
    </View>
  )
}
