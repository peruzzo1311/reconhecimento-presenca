import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Button, View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import PresenceItem from '@/components/presence/item'
import { usePresenceListStore } from '@/store/presence-list'

interface ListaPresencaProps {
  route: {
    params: {
      title: string
    }
  }
  navigation: any
}

export default function ListaPresenca({
  route,
  navigation,
}: ListaPresencaProps) {
  const { participants } = usePresenceListStore()
  const { title } = route.params

  const handleValidatePresence = () => {
    navigation.navigate('Camera')
  }

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <Header />

      <HeaderNavigation
        navigation={navigation}
        title={title}
      />

      <View
        flex={1}
        padding={24}
      >
        <FlatList
          data={participants}
          keyExtractor={(item) => item.numCpf.toString()}
          renderItem={({ item }) => <PresenceItem participant={item} />}
        />
      </View>

      <TouchableOpacity onPress={handleValidatePresence}>
        <Button
          backgroundColor='$primary600'
          color='white'
          margin={20}
          width='100%'
          maxWidth={300}
          marginHorizontal='auto'
          pointerEvents='none'
        >
          Validar presença
        </Button>
      </TouchableOpacity>
    </View>
  )
}
