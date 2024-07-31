import { FlatList } from 'react-native'
import { View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import ItemSync from '@/components/sync-item'
import { useOfflineStore } from '@/store/offline-store'

export default function Sincronizar({ navigation }: any) {
  const { presences } = useOfflineStore()

  return (
    <View flex={1} backgroundColor='white'>
      <Header />

      <HeaderNavigation navigation={navigation} title='Sincronizar presenças' />

      <View flex={1} padding={24}>
        <FlatList
          data={presences}
          keyExtractor={(item) =>
            `${item.codCua}-${item.tmaCua}-${item.participante.numCad}`
          }
          renderItem={({ item }) => <ItemSync participant={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
