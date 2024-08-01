import { FlatList, TouchableOpacity } from 'react-native'
import { View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import ItemSync from '@/components/sync-item'
import {
  ParticipantOffline,
  Presence,
  useOfflineStore,
} from '@/store/offline-store'

export interface TransformedPresence {
  codCua: number
  tmaCua: number
  participante: ParticipantOffline[]
}

export default function Sincronizar({ navigation }: any) {
  const { presences } = useOfflineStore()

  const agruparParticipantes = (presences: Presence[]) => {
    const groupedPresences: TransformedPresence[] = []

    presences.forEach((presence) => {
      const existingPresence = groupedPresences.find(
        (item) =>
          item.codCua === presence.codCua && item.tmaCua === presence.tmaCua
      )

      if (existingPresence) {
        existingPresence.participante.push(presence.participante)
      } else {
        groupedPresences.push({
          codCua: presence.codCua,
          tmaCua: presence.tmaCua,
          participante: [presence.participante],
        })
      }
    })

    return groupedPresences
  }

  const renderItem = ({ item }: { item: TransformedPresence }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SincronizarParticipantes', { item })}
      style={{ overflow: 'hidden', borderRadius: 12 }}
    >
      <ItemSync {...item} />
    </TouchableOpacity>
  )

  if (!presences) {
    return
  }

  return (
    <View flex={1} backgroundColor='white'>
      <Header />

      <HeaderNavigation navigation={navigation} title='Sincronizar presenças' />

      <View flex={1} paddingHorizontal={24} paddingBottom={12}>
        <FlatList
          data={agruparParticipantes(presences)}
          keyExtractor={(item) => `${item.codCua}-${item.tmaCua}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
