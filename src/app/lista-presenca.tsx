import { useToastController } from '@tamagui/toast'
import * as Network from 'expo-network'
import { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Button, Separator, Text, View } from 'tamagui'

import getParticipantes from '@/api/get-participantes'
import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import PresenceItem from '@/components/presence-item'
import { Participant, Training } from '@/types'

interface ListaPresencaProps {
  navigation: any
  route: {
    params: {
      training: Training
    }
  }
}

export default function ListaPresenca({
  navigation,
  route,
}: ListaPresencaProps) {
  const [participantes, setParticipantes] = useState<Participant[]>([])
  const { training } = route.params
  const toast = useToastController()

  useEffect(() => {
    const fetchParticipantes = async () => {
      const participantes = await getParticipantes({
        tmaCua: training.tmaCua,
        codCua: training.codCua,
      })

      console.log(participantes)

      if (participantes && participantes.participantes) {
        if (!Array.isArray(participantes.participantes)) {
          setParticipantes([participantes.participantes])
        }

        setParticipantes(participantes.participantes)
      }
    }

    fetchParticipantes()
  }, [])

  const handleFaceRecognition = async (participant: Participant) => {
    const network = await Network.getNetworkStateAsync()

    if (!network.isConnected) {
      toast.show(
        'Você está offline, não é possível realizar a leitura facial',
        {
          native: true,
          burntOptions: {
            haptic: 'error',
            preset: 'error',
          },
        }
      )

      return
    }

    navigation.navigate('Camera', {
      participant,
    })
  }

  const handleQrCode = () => {
    navigation.navigate('QRCode', {
      training,
    })
  }

  if (!training || !participantes) {
    return null
  }

  return (
    <View flex={1} backgroundColor='white'>
      <Header />

      <HeaderNavigation navigation={navigation} title={training.nomCua} />

      <View flex={1} paddingHorizontal={24}>
        <FlatList
          data={participantes}
          keyExtractor={(item) => item.numCpf.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item: participant }) => (
            <TouchableOpacity
              onPress={
                participant.staFre === 'Presente' ||
                participant.staFre === 'Sincronizar'
                  ? undefined
                  : () => handleFaceRecognition(participant)
              }
            >
              <PresenceItem participant={participant} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity onPress={handleQrCode}>
        <Button
          backgroundColor='$primary600'
          color='white'
          margin={20}
          width='100%'
          maxWidth={300}
          marginHorizontal='auto'
          disabled
        >
          <Text fontWeight='bold' color='white'>
            Ler QRCode
          </Text>
        </Button>
      </TouchableOpacity>
    </View>
  )
}
