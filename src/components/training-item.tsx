import { FontAwesome5 } from '@expo/vector-icons'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'tamagui'

import { useTrainingStore } from '@/store/treinamento-store'
import { Training } from '@/types'

interface TrainingItemProps {
  item: Training
  navigation: any
}

function TrainingItem({ navigation, item }: TrainingItemProps) {
  const { setSelectedTraining } = useTrainingStore()

  const handleSelectTraining = () => {
    setSelectedTraining(item)
    navigation.navigate('ListaPresenca', { training: item })
  }

  return (
    <TouchableOpacity
      style={{ overflow: 'hidden', borderRadius: 15 }}
      onPress={handleSelectTraining}
    >
      <View borderWidth={2} borderColor='$primary600' borderRadius={15}>
        <View
          backgroundColor='$primary600'
          alignItems='center'
          paddingVertical={4}
          gap={8}
        >
          <Text color='white' fontWeight='700'>
            {item.nomCua}
          </Text>
          <Text color='white'>Turma: {item.tmaCua}</Text>
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

              <Text>{item.datIni}</Text>
            </View>

            <View
              alignItems='center'
              justifyContent='center'
              flexDirection='row'
            >
              <FontAwesome5 name='calendar-alt' size={16} color='#0171BB' />

              <Text marginLeft={4} width={45}>
                Fim:
              </Text>

              <Text>{item.datFim}</Text>
            </View>
          </View>

          <FontAwesome5 name='chevron-right' size={20} color='#0171BB' />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default memo(TrainingItem)
