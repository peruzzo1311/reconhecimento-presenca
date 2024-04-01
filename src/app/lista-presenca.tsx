import React from 'react'
import { View } from 'tamagui'

import { HeaderNavigation } from '@/components/header-navigation'
import PresenceFlatList from '@/components/presence/flatlist'
import { Training } from '@/types'

interface ListaPresencaProps {
  route: {
    params: {
      type: 'listagem' | 'validacao'

      training: Training
    }
  }
  navigation: any
}

export default function ListaPresenca({
  route,
  navigation,
}: ListaPresencaProps) {
  const { training } = route.params

  if (!Array.isArray(training.participantes)) {
    training.participantes = [training.participantes]
  }

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <HeaderNavigation
        navigation={navigation}
        title={training.nomCua}
      />

      <View
        flex={1}
        padding={24}
      >
        <PresenceFlatList participants={training.participantes} />
      </View>
    </View>
  )
}
