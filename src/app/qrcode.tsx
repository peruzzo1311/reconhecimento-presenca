import { FontAwesome5 } from '@expo/vector-icons'
import { format } from 'date-fns'
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera'
import Constants from 'expo-constants'
import * as Network from 'expo-network'
import { useState } from 'react'
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import { Button, Text, View } from 'tamagui'

import { QrCodeValidate } from '@/api/validate-presence'
import { useOfflineStore } from '@/store/offline-store'
import { useTrainingStore } from '@/store/treinamento-store'
import { Participant } from '@/types'

interface QRCodeProps {
  navigation: any
}

export default function QRCode({ navigation }: QRCodeProps) {
  const [QrCodeScanned, setQrCodeScanned] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  const { setParticipantPresence, selectedTraining } = useTrainingStore()
  const { presences, addPresence } = useOfflineStore()

  const handleQrCodeScanned = async ({ data }: BarcodeScanningResult) => {
    try {
      setQrCodeScanned(true)
      setIsLoading(true)

      if (!selectedTraining) {
        return
      }

      const user = selectedTraining.participantes.find(
        (participante) => participante.numCad === Number(data)
      )

      if (!user) {
        errorAlert('Participante não encontrado.')

        return
      }

      if (
        user.staFre === 'Presente' ||
        presences.some((p) => p.participante.numCad === user.numCad)
      ) {
        errorAlert(`Presença de ${user.nomFun} já registrada.`)

        return
      }

      const network = await Network.getNetworkStateAsync()

      if (!network.isConnected) {
        console.log('Offline presence')
        await handleOfflinePresence(user)

        return
      }

      await handleOnlinePresence(user)
    } catch (error) {
      console.log(error)

      errorAlert('Ocorreu um erro ao registrar a presença.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOnlinePresence = async (user: Participant) => {
    const res = await QrCodeValidate({
      codCua: selectedTraining!.codCua,
      tmaCua: selectedTraining!.tmaCua,
      participantes: [
        {
          numEmp: user.numEmp,
          tipCol: user.tipCol,
          numCad: user.numCad,
          datFre: format(new Date(), 'dd/MM/yyyy'),
          horFre: format(new Date(), 'HH:mm:ss'),
        },
      ],
    })

    if (res.msgRet !== 'ok') {
      errorAlert(res.msgRet)

      return
    }

    setParticipantPresence(
      selectedTraining!.codCua,
      selectedTraining!.tmaCua,
      user.numCad
    )

    Alert.alert(
      'Sucesso',
      `Presença de ${user.nomFun} registrada com sucesso!`,
      [
        {
          text: 'OK',
          onPress: () => setQrCodeScanned(false),
        },
      ]
    )
  }

  const handleOfflinePresence = async (user: Participant) => {
    addPresence({
      codCua: selectedTraining!.codCua,
      tmaCua: selectedTraining!.tmaCua,
      participante: {
        numEmp: user.numEmp,
        tipCol: user.tipCol,
        numCad: user.numCad,
        nomFun: user.nomFun,
        datFre: format(new Date(), 'dd/MM/yyyy'),
        horFre: format(new Date(), 'HH:mm:ss'),
      },
    })

    setParticipantPresence(
      selectedTraining!.codCua,
      selectedTraining!.tmaCua,
      user.numCad
    )

    Alert.alert(
      'Sucesso',
      `Presença de ${user.nomFun} registrada com sucesso!`,
      [
        {
          text: 'OK',
          onPress: () => setQrCodeScanned(false),
        },
      ]
    )
  }

  const errorAlert = (title: string) => {
    Alert.alert('Erro', title ?? 'Ocorreu um erro ao registrar a presença.', [
      {
        text: 'OK',
        onPress: () => setQrCodeScanned(false),
      },
    ])
  }

  if (!permission) {
    return (
      <View
        flex={1}
        justifyContent='center'
        alignItems='center'
        backgroundColor='white'
      >
        <Text fontSize='$4' fontWeight='700' textAlign='center'>
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
    <View flex={1} backgroundColor='white'>
      <View height={Constants.statusBarHeight} backgroundColor='$primary600' />

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
          onPress={() => navigation.navigate('ListaPresenca')}
        >
          <FontAwesome5 name='chevron-left' size={24} color='#0171BB' />
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
        onBarcodeScanned={QrCodeScanned ? undefined : handleQrCodeScanned}
      />

      {isLoading && (
        <View
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor='rgba(0, 0, 0, 0.5)'
          justifyContent='center'
          alignItems='center'
        >
          <ActivityIndicator />
        </View>
      )}
    </View>
  )
}
