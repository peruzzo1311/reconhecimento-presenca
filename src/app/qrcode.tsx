import { FontAwesome5 } from '@expo/vector-icons'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { BarCodeScanningResult, CameraType } from 'expo-camera'
import Constants from 'expo-constants'
import { useEffect, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Button, Text, View } from 'tamagui'

import { useTrainingStore } from '@/store/treinamento-store'

interface QRCodeProps {
  navigation: any
}

export default function QRCode({ navigation }: QRCodeProps) {
  const [barCodeScanned, setBarCodeScanned] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  const { setParticipantPresence, training } = useTrainingStore()

  const handleBarCodeScanned = ({ data }: BarCodeScanningResult) => {
    setBarCodeScanned(true)

    if (!training) {
      return
    }

    training.participantes.forEach((participant) => {
      if (participant.numCad === Number(data)) {
        setParticipantPresence(participant.numCad)

        Alert.alert('Sucesso', 'Presença registrada com sucesso!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ListaPresenca'),
          },
        ])
      }
    })
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  if (!hasPermission) {
    return (
      <View
        flex={1}
        justifyContent='center'
        alignItems='center'
        backgroundColor='white'
      >
        <Text
          fontSize='$4'
          fontWeight='700'
          textAlign='center'
        >
          Precisamos de permissão para acessar a câmera do seu dispositivo.
        </Text>

        <Button
          onPress={() => {
            BarCodeScanner.requestPermissionsAsync().then(({ status }) =>
              setHasPermission(status === 'granted')
            )
          }}
          marginTop={16}
          backgroundColor='$primary600'
          color='white'
        >
          Permitir acesso à câmera
        </Button>
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
            Escaneie um QR Code
          </Text>
        </View>
      </View>

      <BarCodeScanner
        style={{ flex: 1 }}
        type={CameraType.back}
        onBarCodeScanned={barCodeScanned ? undefined : handleBarCodeScanned}
      />
    </View>
  )
}
