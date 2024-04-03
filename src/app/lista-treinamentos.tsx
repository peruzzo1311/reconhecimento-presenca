import { View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import { TrainingList } from '@/components/training/flatlist'

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
  const { type } = route.params

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <Header />

      <HeaderNavigation
        navigation={navigation}
        title='Lista de Treinamentos'
      />

      <View padding={24}>
        <TrainingList type={type} />
      </View>
    </View>
  )
}
