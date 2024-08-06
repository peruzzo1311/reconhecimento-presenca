import { EvilIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Button, Separator, Text, View } from 'tamagui'

import { TransformedPresence } from './sincronizar-grupos'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import { ParticipantOffline, useOfflineStore } from '@/store/offline-store'

interface SincronizarParticipantesProps {
  route: {
    params: {
      item: TransformedPresence
    }
  }
  navigation: any
}

export default function SincronizarParticipantes({
  route,
  navigation,
}: SincronizarParticipantesProps) {
  const [participantsList, setParticipantsList] = useState<
    ParticipantOffline[]
  >([])
  const { item: curso } = route.params
  const { removePresence } = useOfflineStore()

  useEffect(() => {
    setParticipantsList(curso.participante)
  }, [curso])

  const handleDelete = (item: ParticipantOffline) => {
    removePresence(item)
    setParticipantsList((prev) =>
      prev.filter((participant) => participant !== item)
    )
  }

  const renderItem = ({ item }: { item: ParticipantOffline }) => (
    <View
      backgroundColor='white'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      paddingVertical={12}
    >
      <View width='80%'>
        <Text fontSize='$4'>{item.nomFun}</Text>
      </View>

      <View flex={1} justifyContent='center' alignItems='center'>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Button disabled size='$3' circular backgroundColor='$red10'>
            <EvilIcons name='trash' size={26} color='white' />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View flex={1} backgroundColor='white'>
      <Header />

      <HeaderNavigation navigation={navigation} title='Sincronizar presenças' />

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
