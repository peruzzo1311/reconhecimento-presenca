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
import { useUserStore } from '@/store/user-store'

interface ListaPresencaProps {
  navigation: any
  route: {
    params: {
      training: Training
    }
  }
}

export default function ListaPresenca({ navigation, route }: ListaPresencaProps) {
  const [participantes, setParticipantes] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { training } = route.params
  const toast = useToastController()

  const { trainingList } = useTrainingStore()
  const { isOffline, setIsOffline } = useOfflineStore()
  const { presenceOffline } = useOfflineStore()
  const { prodDomain } = useUserStore()

  const onRefresh = async () => {
    const network = await Network.getNetworkStateAsync()

    if (!network.isConnected) {
      setIsOffline(true)
      fetchParticipantsOffline()

      return
    }

    setIsOffline(false)
    fetchParticipantes()
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
        tenant: prodDomain,
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
            item.participantes.find((participante) => participante.numCpf === participant.numCpf)
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

      const selectedTraining = trainingList.find(
        (item) => item.codCua === training.codCua && item.tmaCua === training.tmaCua
      )

      if (!selectedTraining || !selectedTraining.participantes) {
        return
      }

      setParticipantes(selectedTraining.participantes)
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
      fetchParticipantes()
    })

    return unsubscribe
  }, [navigation, trainingList])

  const handleFaceRecognition = async (participant: Participant) => {
    if (isOffline) {
      toast.show('Você está offline, não é possível realizar a leitura facial', {
        type: 'error',
      })

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
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
          renderItem={({ item: participant }) => (
            <TouchableOpacity
              onPress={
                participant.staFre === 'Presente' || participant.staFre === 'Sincronizar'
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
            training: {
              codCua: training.codCua,
              nomCua: training.nomCua,
              tmaCua: training.tmaCua,
              datIni: training.datIni,
              datFim: training.datFim,
              participantes,
            },
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
