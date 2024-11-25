import { useEffect, useState } from 'react'
import { Alert, FlatList, TouchableOpacity } from 'react-native'
import { Button, Separator, View, Text } from 'tamagui'

import { QrCodeValidate } from '@/api/validate-presence'
import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import Spinner from '@/components/spinner'
import ItemParticipantSync from '@/components/sync-participant'
import { useOfflineStore } from '@/store/offline-store'
import { useTrainingStore } from '@/store/treinamento-store'
import { ParticipantePresence, Presence } from '@/types'
import { useUserStore } from '@/store/user-store'

interface SincronizarParticipantesProps {
  route: {
    params: {
      item: Presence
    }
  }
  navigation: any
}

export default function SincronizarParticipantes({
  route,
  navigation,
}: SincronizarParticipantesProps) {
  const [participantsList, setParticipantsList] = useState<ParticipantePresence[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { item: curso } = route.params

  const { trainingList } = useTrainingStore()
  const { removeAllParticipantsOffline } = useOfflineStore()
  const { prodDomain } = useUserStore()

  const getTitle = () => {
    const training = trainingList.find(
      (training) => training.codCua === curso.codCua && training.tmaCua === curso.tmaCua
    )

    if (!training) {
      return 'Sincronizar presenças'
    }

    return training.nomCua
  }

  const syncAll = async () => {
    try {
      setIsLoading(true)

      const response = await QrCodeValidate({
        codCua: curso.codCua,
        tmaCua: curso.tmaCua,
        participantes: participantsList,
        tenant: prodDomain,
      })

      if (response.msgRet !== 'ok') {
        Alert.alert('Erro', response.msgRet ?? 'Ocorreu um erro ao confirmar a presença')

        return
      }

      removeAllParticipantsOffline(curso.codCua, curso.tmaCua)
      setParticipantsList([])

      Alert.alert('Sucesso', 'Presenças confirmadas com sucesso', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ])
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Ocorreu um erro ao confirmar a presença')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setParticipantsList(curso.participantes)
  }, [curso])

  const renderItem = ({ item }: { item: ParticipantePresence }) => (
    <ItemParticipantSync
      item={item}
      codCua={curso.codCua}
      tmaCua={curso.tmaCua}
      participantsList={participantsList}
      setParticipantsList={setParticipantsList}
      setIsLoading={setIsLoading}
    />
  )

  return (
    <>
      <View flex={1} backgroundColor='white'>
        <Header />

        <HeaderNavigation title={getTitle()} navigation={navigation} />

        <View flex={1} paddingHorizontal={24}>
          <FlatList
            data={participantsList}
            keyExtractor={(item) => item.numCad.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Separator />}
            renderItem={renderItem}
          />
        </View>

        <Separator />

        <TouchableOpacity onPress={syncAll}>
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
              Sincronizar tudo
            </Text>
          </Button>
        </TouchableOpacity>
      </View>

      {isLoading && <Spinner />}
    </>
  )
}
