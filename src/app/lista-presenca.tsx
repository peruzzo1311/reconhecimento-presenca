import { useToastController } from '@tamagui/toast'
import * as Network from 'expo-network'
import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native'
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
  const [isLoading, setIsLoading] = useState(false)
  const { training } = route.params
  const toast = useToastController()

  const fetchParticipantes = async () => {
    const isConnected = await Network.getNetworkStateAsync()

    if (!isConnected.isConnected) {
      // fetchParticipantsOffline()

      return
    }

    try {
      setIsLoading(true)

      if (!training) {
        navigation.navigate('ListaTreinamentos')

        return
      }

      const participantes = await getParticipantes({
        tmaCua: training.tmaCua,
        codCua: training.codCua,
      })

      if (participantes && participantes.participantes) {
        if (!Array.isArray(participantes.participantes)) {
          setParticipantes([participantes.participantes])
        }

        setParticipantes(participantes.participantes)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchParticipantes()
    })

    return unsubscribe
  }, [training, navigation])

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
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchParticipantes}
            />
          }
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

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('QRCode', {
            training,
            participants: participantes,
          })
        }
      >
        <Button
          backgroundColor='#0171BB'
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
