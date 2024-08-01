import { FontAwesome5 } from '@expo/vector-icons'
import { memo } from 'react'
import { Text, View } from 'tamagui'

import { TransformedPresence } from '@/app/sincronizar-grupos'
import { useTrainingStore } from '@/store/treinamento-store'

function ItemSync(item: TransformedPresence) {
  const { trainingList } = useTrainingStore()

  const training = trainingList.find(
    (training) =>
      training.codCua === item.codCua && training.tmaCua === item.tmaCua
  )

  if (!training) {
    return null
  }

  return (
    <View borderWidth={2} borderColor='$primary600' borderRadius={15}>
      <View
        backgroundColor='$primary600'
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
