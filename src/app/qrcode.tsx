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
import { Participant, Training } from '@/types'

interface QRCodeProps {
  navigation: any
  route: {
    params: {
      training: Training
      participants: Participant[]
    }
  }
}

export default function QRCode({ navigation, route }: QRCodeProps) {
  const [presences, setPresences] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [scanned, setScanned] = useState(false)

  const [permission, requestPermission] = useCameraPermissions()
  const { training, participants } = route.params

  const handleQrCodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (scanned) {
      return
    }

    setScanned(true)
    setIsLoading(true)

    if (!training || !participants) {
      asyncAlert('Erro', 'Treinamento não encontrado')

      return
    }

    const participant = participants.find((p) => p.numCad === Number(data))

    if (!participant) {
      asyncAlert('Erro', 'Participante não encontrado')

      return
    }

    if (
      participant.staFre === 'Presente' ||
      participant.staFre === 'Sincronizar'
    ) {
      asyncAlert('Erro', 'Participante já está presente')

      return
    }

    const network = await Network.getNetworkStateAsync()

    if (!network.isConnected) {
      handleOfflinePresence(participant)
    } else {
      await handleOnlinePresence(participant)
    }
  }

  const handleOnlinePresence = async (participant: Participant) => {
    if (!training) {
      asyncAlert('Erro', 'Treinamento não encontrado')

      return
    }

    const participantExists = presences.find(
      (p) => p.numCad === participant.numCad
    )

    if (participantExists) {
      asyncAlert('Erro', 'Participante já está presente')

      return
    }

    const res = await QrCodeValidate({
      codCua: training.codCua,
      tmaCua: training.tmaCua,
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
      asyncAlert('Erro', res.msgRet)

      return
    }

    setPresences([...presences, participant])
    asyncAlert(
      'Sucesso',
      `Presença de ${participant.nomFun} registrada com sucesso!`
    )
  }

  const handleOfflinePresence = (participant: Participant) => {
    if (!training) {
      return
    }

    asyncAlert('Sucesso', `Verificação offline em desenvolvimento`)
  }

  const asyncAlert = (title: string, subtitle: string) => {
    Alert.alert(
      title,
      subtitle ?? 'Ocorreu um erro ao registrar a presença.',
      [
        {
          text: 'OK',
          onPress: () => {
            setIsLoading(false)
            setScanned(false)
          },
        },
      ],
      {
        onDismiss: () => {
          setIsLoading(false)
          setScanned(false)
        },
      }
    )
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
          onPress={() => navigation.navigate('ListaPresenca', { training })}
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
        onBarcodeScanned={handleQrCodeScanned}
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
