import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import PresenceFlatList from '@/components/presence/flatlist'
import { usePresenceListStore } from '@/store/presence-list'

interface ListaPresencaProps {
  route: {
    params: {
      type: 'listagem' | 'validacao'
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
    navigation.navigate('Camera', {
      participants,
    })
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
        <PresenceFlatList participants={participants} />
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
