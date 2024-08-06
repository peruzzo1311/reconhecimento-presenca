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
  const [isLoading, setIsLoading] = useState(false)
  const [QrCodeScanned, setQrCodeScanned] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  const { selectedTraining, setPresence, setSelectedTraining } =
    useTrainingStore()

  const { addPresence } = useOfflineStore()

  const handleQrCodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (QrCodeScanned) {
      return
    }

    setQrCodeScanned(true)
    setIsLoading(true)

    if (!selectedTraining) {
      Alert.alert('Erro', 'Treinamento não encontrado')
      setQrCodeScanned(false)
      setIsLoading(false)

      return
    }

    const participant = selectedTraining.participantes.find(
      (p) => p.numCad === Number(data)
    )

    if (!participant) {
      Alert.alert('Erro', 'Participante não encontrado')
      setQrCodeScanned(false)
      setIsLoading(false)

      return
    }

    if (
      participant.staFre === 'Presente' ||
      participant.staFre === 'Sincronizar'
    ) {
      Alert.alert('Erro', 'Participante já está presente', [
        {
          text: 'OK',
          onPress: () => {
            setQrCodeScanned(false)
            setIsLoading(false)
          },
        },
      ])

      return
    }

    const network = await Network.getNetworkStateAsync()

    if (!network.isConnected) {
      handleOfflinePresence(participant)
    } else {
      await handleOnlinePresence(participant)
    }
  }

  const handleSetPresence = (participant: Participant) => {
    if (!selectedTraining) {
      return
    }

    setPresence({
      ...participant,
      staFre: 'Presente',
    })

    setSelectedTraining({
      ...selectedTraining,
      participantes: selectedTraining.participantes.map((p) => {
        if (p.numCad === participant.numCad) {
          return {
            ...p,
            staFre: 'Presente',
          }
        }

        return p
      }),
    })

    console.log(selectedTraining)
  }

  const handleOnlinePresence = async (participant: Participant) => {
    if (!selectedTraining) {
      return
    }

    const res = await QrCodeValidate({
      codCua: selectedTraining.codCua,
      tmaCua: selectedTraining.tmaCua,
      participantes: [
        {
          numEmp: participant.numEmp,
          tipCol: participant.tipCol,
          numCad: participant.numCad,
          datFre: format(new Date(), 'dd/MM/yyyy'),
          horFre: format(new Date(), 'HH:mm:ss'),
        },
      ],
    })

    if (res.msgRet !== 'ok') {
      errorAlert(res.msgRet)

      return
    }

    handleSetPresence(participant)

    Alert.alert(
      'Sucesso',
      `Presença de ${participant.nomFun} registrada com sucesso!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setQrCodeScanned(false)
            setIsLoading(false)
          },
        },
      ]
    )
  }

  const handleOfflinePresence = (participant: Participant) => {
    if (!selectedTraining) {
      return
    }

    addPresence({
      codCua: selectedTraining.codCua,
      tmaCua: selectedTraining.tmaCua,
      participante: {
        numEmp: participant.numEmp,
        tipCol: participant.tipCol,
        numCad: participant.numCad,
        nomFun: participant.nomFun,
        datFre: format(new Date(), 'dd/MM/yyyy'),
        horFre: format(new Date(), 'HH:mm:ss'),
      },
    })

    handleSetPresence(participant)

    Alert.alert(
      'Sucesso',
      `Presença de ${participant.nomFun} registrada com sucesso!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setQrCodeScanned(false)
            setIsLoading(false)
          },
        },
      ]
    )
  }

  const errorAlert = (title: string) => {
    Alert.alert('Erro', title ?? 'Ocorreu um erro ao registrar a presença.')
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
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
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
