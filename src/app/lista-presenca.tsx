import { useToastController } from '@tamagui/toast'
import * as Network from 'expo-network'
import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { Button, Separator, Text, View } from 'tamagui'

import getParticipantes from '@/api/get-participantes'
import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import PresenceItem from '@/components/presence-item'
import { useOfflineStore } from '@/store/offline-store'
import { useTrainingStore } from '@/store/treinamento-store'
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
  const { trainingList } = useTrainingStore()
  const { isOffline, setIsOffline } = useOfflineStore()
  const presenceOffline = useOfflineStore((state) => state.presenceOffline)
  const toast = useToastController()

  const onRefresh = async () => {
    const network = await Network.getNetworkStateAsync()

    if (!network.isConnected) {
      setIsOffline(true)
      fetchParticipantsOffline()

      return
    }

    setIsOffline(false)
    fetchParticipantsOffline()
    // fetchParticipantes()
  }

  const fetchParticipantes = async () => {
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

      if (!participantes || !participantes.participantes) {
        return
      }

      if (!Array.isArray(participantes.participantes)) {
        setParticipantes([participantes.participantes])

        return
      }

      participantes.participantes.map((participant) => {
        const isPresent = presenceOffline.find(
          (item) =>
            item.codCua === training.codCua &&
            item.tmaCua === training.tmaCua &&
            item.participantes.find(
              (participante) => participante.numCad === participant.numCad
            )
        )

        if (isPresent && participant.staFre !== 'Presente') {
          participant.staFre = 'Sincronizar'
        }

        return participant
      })

      setParticipantes(participantes.participantes)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchParticipantsOffline = async () => {
    try {
      setIsLoading(true)

      if (!training) {
        navigation.navigate('ListaTreinamentos')

        return
      }

      const trainingOffline = trainingList.find(
        (item) =>
          item.codCua === training.codCua && item.tmaCua === training.tmaCua
      )

      if (!trainingOffline || !trainingOffline.participantes) {
        return
      }

      const participants = trainingOffline.participantes.map((participant) => {
        const isPresent = presenceOffline.find(
          (item) =>
            item.codCua === training.codCua &&
            item.tmaCua === training.tmaCua &&
            item.participantes.find(
              (participante) => participante.numCad === participant.numCad
            )
        )

        if (isPresent && participant.staFre !== 'Presente') {
          participant.staFre = 'Sincronizar'
        }

        return participant
      })

      console.log(participants)
      console.log(trainingOffline.participantes)

      setParticipantes(participants)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const network = await Network.getNetworkStateAsync()

      if (!network.isConnected) {
        setIsOffline(true)
        fetchParticipantsOffline()

        return
      }

      setIsOffline(false)
      fetchParticipantsOffline()
      // fetchParticipantes()
    })

    return unsubscribe
  }, [navigation])

  const handleFaceRecognition = async (participant: Participant) => {
    if (isOffline) {
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
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
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

      <Separator />

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
