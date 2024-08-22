import { FlatList, TouchableOpacity } from 'react-native'
import { Button, Text, View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import ItemSync from '@/components/sync-item'
import { useOfflineStore } from '@/store/offline-store'
import { Presence } from '@/types'

export default function SincronizarGrupos({ navigation }: any) {
  const { presenceOffline } = useOfflineStore()

  const agruparPresencas = (presences: Presence[]) => {
    const grupos: { [key: string]: Presence } = {}

    presences.forEach((presenca) => {
      const chave = `${presenca.codCua}-${presenca.tmaCua}`

      if (!grupos[chave]) {
        grupos[chave] = {
          codCua: presenca.codCua,
          tmaCua: presenca.tmaCua,
          participantes: [],
        }
      }

      grupos[chave].participantes.push(...presenca.participantes)
    })

    return Object.values(grupos)
  }

  const renderItem = ({ item }: { item: Presence }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SincronizarParticipantes', { item })}
      style={{ overflow: 'hidden', borderRadius: 12 }}
    >
      <ItemSync {...item} />
    </TouchableOpacity>
  )

  if (!presenceOffline || presenceOffline.length === 0) {
    return (
      <View flex={1} backgroundColor='white'>
        <Header />

        <View flex={1} justifyContent='center' alignItems='center' gap={24}>
          <Text fontSize='$5'>
            Você não possui presenças para sincronizar...
          </Text>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Button
              backgroundColor='#0171BB'
              color='white'
              pointerEvents='none'
            >
              Voltar
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View flex={1} backgroundColor='white'>
      <Header />

      <HeaderNavigation navigation={navigation} title='Sincronizar presenças' />

      <View flex={1} paddingHorizontal={24} paddingBottom={12}>
        <FlatList
          data={agruparPresencas(presenceOffline)}
          keyExtractor={(item) => `${item.codCua}-${item.tmaCua}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
