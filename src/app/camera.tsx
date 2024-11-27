import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import Constants from 'expo-constants'
import { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, Text, View } from 'tamagui'
import * as ImageManipulator from 'expo-image-manipulator'

import { Participant, Training } from '@/types'

interface CameraProps {
  navigation: any
  route: {
    params: {
      participant: Participant
      training: Training
    }
  }
}

export default function Camera({ navigation, route }: CameraProps) {
  const [facing, setFacing] = useState<CameraType>('front')
  const [isLoading, setIsLoading] = useState(false)
  const cameraRef = useRef<CameraView>(null)

  const { participant, training } = route.params
  const [permission, requestPermission] = useCameraPermissions()

  const handleTakePicture = async () => {
    if (!cameraRef.current) {
      return
    }

    setIsLoading(true)

    const photo = await cameraRef.current.takePictureAsync({
      base64: true,
      isImageMirror: facing === 'front',
    })

    if (!photo) {
      setIsLoading(false)
      return
    }

    const manipulatedImage = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 200, height: 200 } }],
      { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    )

    setIsLoading(false)

    navigation.navigate('Foto', {
      photo: {
        base64: manipulatedImage.base64,
        uri: photo.uri,
      },
      participant,
      training,
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
        padding={24}
      >
        <Text textAlign='center'>Conceda a permissão para poder realizar captura de fotos</Text>

        <TouchableOpacity onPress={requestPermission}>
          <Button
            backgroundColor='#0171BB'
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
    <View flex={1} backgroundColor='white'>
      <View height={Constants.statusBarHeight} backgroundColor='#0171BB' />

      <>
        <View
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
          paddingHorizontal={24}
          paddingVertical={8}
        >
          <TouchableOpacity
            style={{ padding: 12 }}
            onPress={() =>
              navigation.navigate('ListaPresenca', {
                training,
              })
            }
          >
            <FontAwesome5 name='chevron-left' size={24} color='#0171BB' />
          </TouchableOpacity>

          <View flex={1}>
            <Text marginLeft={-16} fontWeight='700' fontSize='$5' textAlign='center'>
              Reconhecimento facial
            </Text>
          </View>
        </View>
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />
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
            <FontAwesome5 name='camera' size={28} color='white' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
            <MaterialIcons name='flip-camera-android' size={28} color='#0171BB' />
          </TouchableOpacity>
        </View>
      </>

      {isLoading && (
        <View
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          justifyContent='center'
          alignItems='center'
          backgroundColor='rgba(0, 0, 0, 0.5)'
        >
          <Text color='white' fontSize='$5' fontWeight='700'>
            Capturando foto...
          </Text>
        </View>
      )}
    </View>
  )
}
