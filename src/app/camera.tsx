import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { CameraType, Camera as ExpoCamera } from 'expo-camera'
import Constants from 'expo-constants'
import { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, Text, View } from 'tamagui'

interface CameraProps {
  navigation: any
}

export default function Camera({ navigation }: CameraProps) {
  const [focus, setFocus] = useState(false)
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.front)
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions()

  const cameraRef = useRef<ExpoCamera>(null)

  const handleTakePicture = async () => {
    if (!cameraRef.current) {
      return
    }

    const photo = await cameraRef.current.takePictureAsync({
      base64: true,
    })

    navigation.navigate('Foto', {
      photo: {
        base64: photo.base64,
        uri: photo.uri,
      },
    })
  }

  if (!permission || !permission.granted) {
    return (
      <View
        flex={1}
        backgroundColor='white'
        justifyContent='center'
        alignContent='center'
        gap={12}
      >
        <Text textAlign='center'>
          Conceda a permissão para poder realizar captura de fotos
        </Text>

        <TouchableOpacity onPress={requestPermission}>
          <Button
            backgroundColor='$primary600'
            color='white'
            width='100%'
            maxWidth={300}
            marginHorizontal='auto'
            pointerEvents='none'
          >
            Conceder permissão
          </Button>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <View
        height={Constants.statusBarHeight}
        backgroundColor='$primary600'
      />

      <View
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        width='100%'
        paddingHorizontal={24}
        paddingVertical={8}
      >
        <TouchableOpacity
          style={{ padding: 8, paddingLeft: 0 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5
            name='chevron-left'
            size={24}
            color='#0171BB'
          />
        </TouchableOpacity>

        <View flex={1}>
          <Text
            marginLeft={-16}
            fontWeight='700'
            fontSize='$5'
            textAlign='center'
          >
            Reconhecimento facial
          </Text>
        </View>
      </View>

      <ExpoCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={cameraType}
        autoFocus={focus}
        focusDepth={focus ? 0 : 1}
        onTouchStart={() => setFocus(!focus)}
      />

      <View
        height={100}
        justifyContent='center'
        alignItems='center'
        flexDirection='row'
        marginLeft={90}
        gap={60}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#0171BB',
            padding: 16,
            borderRadius: 100,
          }}
          onPress={handleTakePicture}
        >
          <FontAwesome5
            name='camera'
            size={28}
            color='white'
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setCameraType(
              cameraType === CameraType.back
                ? CameraType.front
                : CameraType.back
            )
          }
        >
          <MaterialIcons
            name='flip-camera-android'
            size={28}
            color='#0171BB'
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
