import { View } from 'tamagui'

import { HeaderNavigation } from '@/components/header-navigation'
import { FlatlistCurso } from '@/components/lista-curso/flatlist'

interface ListaTreinamentosProps {
  route: {
    params: {
      type: 'listagem' | 'validacao'
    }
  }
  navigation: any
}

export default function ListaTreinamentos({
  route,
  navigation,
}: ListaTreinamentosProps) {
  // const { type } = route.params

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <HeaderNavigation
        navigation={navigation}
        title='Lista de Treinamentos'
      />

      <View padding={24}>
        <FlatlistCurso />
      </View>
    </View>
  )
}
