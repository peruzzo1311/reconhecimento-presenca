import { FontAwesome5 } from '@expo/vector-icons'
import { memo } from 'react'
import { Text, View } from 'tamagui'

import { useTrainingStore } from '@/store/treinamento-store'
import { Presence } from '@/types'

function ItemSync(item: Presence) {
  const { trainingList } = useTrainingStore()

  const training = trainingList.find(
    (training) =>
      training.codCua === item.codCua && training.tmaCua === item.tmaCua
  )

  if (!training) {
    return null
  }

  return (
    <View borderWidth={2} borderColor='#0171BB' borderRadius={15}>
      <View
        backgroundColor='#0171BB'
        alignItems='center'
        paddingVertical={4}
        gap={8}
      >
        <Text color='white' fontWeight='700'>
          {training.nomCua}
        </Text>

        <Text color='white'>Turma: {training.tmaCua}</Text>
      </View>

      <View
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        padding={16}
      >
        <FontAwesome5 name='user-graduate' size={32} color='#0171BB' />

        <View flexDirection='column' gap={8}>
          <View alignItems='center' flexDirection='row'>
            <FontAwesome5 name='calendar-alt' size={16} color='#0171BB' />

            <Text marginLeft={4} width={45}>
              Início:
            </Text>

            <Text>{training.datIni}</Text>
          </View>

          <View alignItems='center' justifyContent='center' flexDirection='row'>
            <FontAwesome5 name='calendar-alt' size={16} color='#0171BB' />

            <Text marginLeft={4} width={45}>
              Fim:
            </Text>

            <Text>{training.datFim}</Text>
          </View>
        </View>

        <FontAwesome5 name='chevron-right' size={20} color='#0171BB' />
      </View>
    </View>
  )
}

export default memo(ItemSync)
