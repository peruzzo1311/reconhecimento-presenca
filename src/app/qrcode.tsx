import { FontAwesome5 } from '@expo/vector-icons'
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera'
import Constants from 'expo-constants'
import { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Button, Text, View } from 'tamagui'

import { useTrainingStore } from '@/store/treinamento-store'

interface QRCodeProps {
  navigation: any
}

export default function QRCode({ navigation }: QRCodeProps) {
  const [barcodeScanned, setBarcodeScanned] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  const { setParticipantPresence, selectedTraining } = useTrainingStore()

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    try {
      setBarcodeScanned(true)

      if (!selectedTraining) {
        return
      }

      const user = selectedTraining.participantes.find(
        (participant) => participant.numCad === Number(data)
      )

      if (!user) {
        Alert.alert('Erro', 'Participante não encontrado.', [
          {
            text: 'OK',
            onPress: () => setBarcodeScanned(false),
          },
        ])

        return
      }

      if (user.isPresent) {
        Alert.alert('Erro', 'Presença já registrada.', [
          {
            text: 'OK',
            onPress: () => setBarcodeScanned(false),
          },
        ])

        return
      }

      setParticipantPresence(
        selectedTraining.codCua,
        selectedTraining.tmaCua,
        user.numCad
      )

      Alert.alert('Sucesso', 'Presença registrada com sucesso!', [
        {
          text: 'OK',
          onPress: () => setBarcodeScanned(false),
        },
      ])
    } catch (error) {
      console.log(error)

      Alert.alert('Erro', 'Ocorreu um erro ao registrar a presença.', [
        {
          text: 'OK',
          onPress: () => setBarcodeScanned(false),
        },
      ])
    }
  }

  if (!permission) {
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
          onPress={requestPermission}
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

      <CameraView
        style={{ flex: 1 }}
        facing='back'
        autofocus='on'
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={barcodeScanned ? undefined : handleBarCodeScanned}
      />
    </View>
  )
}
