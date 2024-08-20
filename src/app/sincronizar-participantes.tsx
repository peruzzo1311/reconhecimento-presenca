import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Separator, View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import ItemParticipantSync from '@/components/sync-participant'
import { useTrainingStore } from '@/store/treinamento-store'
import { ParticipantePresence, Presence } from '@/types'

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
  const [participantsList, setParticipantsList] = useState<
    ParticipantePresence[]
  >([])
  const { item: curso } = route.params
  const { trainingList } = useTrainingStore()

  const getTitle = () => {
    const training = trainingList.find(
      (training) =>
        training.codCua === curso.codCua && training.tmaCua === curso.tmaCua
    )

    if (!training) {
      return 'Sincronizar presenças'
    }

    return training.nomCua
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
    />
  )

  return (
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
    </View>
  )
}
