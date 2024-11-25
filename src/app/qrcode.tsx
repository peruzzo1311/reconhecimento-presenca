import { FontAwesome5 } from '@expo/vector-icons'
import { format } from 'date-fns'
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera'
import Constants from 'expo-constants'
import * as Network from 'expo-network'
import { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Button, Text, View } from 'tamagui'

import { QrCodeValidate } from '@/api/validate-presence'
import Spinner from '@/components/spinner'
import { useOfflineStore } from '@/store/offline-store'
import { useTrainingStore } from '@/store/treinamento-store'
import { Participant, Training } from '@/types'
import { useUserStore } from '@/store/user-store'

interface QRCodeProps {
  navigation: any
  route: {
    params: {
      training: Training
    }
  }
}

export default function QRCode({ navigation, route }: QRCodeProps) {
  const [presences, setPresences] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  const { training } = route.params

  const { trainingList, setTrainingList } = useTrainingStore()
  const { presenceOffline, addPresenceOffline } = useOfflineStore()
  const { prodDomain } = useUserStore()

  const handleQrCodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (scanned) {
      return
    }

    setScanned(true)
    setIsLoading(true)

    if (!training) {
      asyncAlert('Erro', 'Treinamento não encontrado')

      return
    }

    const participant = training.participantes.find((p) => p.numCad === Number(data))

    if (!participant) {
      asyncAlert('Erro', 'Participante não encontrado')

      return
    }

    if (participant.staFre === 'Presente' || participant.staFre === 'Sincronizar') {
      asyncAlert('Erro', 'Participante já está presente')

      return
    }

    console.log('Participant:', participant)

    const participantExists = presences.find((p) => p.numCad === participant.numCad)

    if (participantExists) {
      asyncAlert('Erro', 'Participante já está presente')

      return
    }

    console.log('Presence:', presences)

    const presenceOfflineExists = presenceOffline.find(
      (item) =>
        item.codCua === training.codCua &&
        item.tmaCua === training.tmaCua &&
        item.participantes.find((participante) => participante.numCad === participant.numCad)
    )

    if (presenceOfflineExists) {
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
      tenant: prodDomain,
    })

    if (res.msgRet !== 'ok') {
      asyncAlert('Erro', res.msgRet)

      return
    }

    setPresences([...presences, participant])
    asyncAlert('Sucesso', `Presença de ${participant.nomFun} registrada com sucesso!`)
  }

  const handleOfflinePresence = async (participant: Participant) => {
    if (!training) {
      asyncAlert('Erro', 'Treinamento não encontrado')

      return
    }

    const participante = {
      numEmp: participant.numEmp,
      tipCol: participant.tipCol,
      numCad: participant.numCad,
      fotCol: participant.fotCol,
      nomFun: participant.nomFun,
      datFre: format(new Date(), 'dd/MM/yyyy'),
      horFre: format(new Date(), 'HH:mm:ss'),
    }

    addPresenceOffline(training.codCua, training.tmaCua, participante)
    setPresences([...presences, participant])

    setTrainingList(
      trainingList.map((t) => {
        if (t.codCua === training.codCua && t.tmaCua === training.tmaCua) {
          return {
            ...t,
            participantes: t.participantes.map((p) => {
              if (p.numCad === participant.numCad) {
                return { ...p, staFre: 'Sincronizar' }
              }

              return p
            }),
          }
        }

        return t
      })
    )

    asyncAlert('Sucesso', `Presença de ${participant.nomFun} registrada!`)
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
          <Text marginLeft={-16} fontWeight='700' fontSize='$5' textAlign='center'>
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

      {isLoading && <Spinner />}
    </View>
  )
}
