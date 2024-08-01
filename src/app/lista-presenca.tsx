import { useToastController } from '@tamagui/toast'
import * as Network from 'expo-network'
import { FlatList, TouchableOpacity } from 'react-native'
import { Button, Separator, Text, View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import PresenceItem from '@/components/presence-item'
import { useTrainingStore } from '@/store/treinamento-store'
import { Participant } from '@/types'

interface ListaPresencaProps {
  navigation: any
}

export default function ListaPresenca({ navigation }: ListaPresencaProps) {
  const { selectedTraining, setSelectedParticipant } = useTrainingStore()
  const toast = useToastController()

  const handleFaceRecognition = async (participant: Participant) => {
    const network = await Network.getNetworkStateAsync()

    if (!network.isConnected) {
      toast.show(
        'Você está offline, não é possível realizar a leitura facial',
        {
          native: true,
          burntOptions: {
            haptic: 'error',
            preset: 'error',
          },
        }
      )

      return
    }

    setSelectedParticipant(participant)
    navigation.navigate('Camera')
  }

  if (!selectedTraining) {
    return null
  }

  return (
    <View flex={1} backgroundColor='white'>
      <Header />

      <HeaderNavigation
        navigation={navigation}
        title={selectedTraining.nomCua}
      />

      <View flex={1} paddingHorizontal={24}>
        <FlatList
          data={selectedTraining.participantes}
          keyExtractor={(item) => item.numCpf.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={
                item.staFre === 'Presente'
                  ? undefined
                  : () => handleFaceRecognition(item)
              }
            >
              <PresenceItem participant={item} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('QRCode')}>
        <Button
          backgroundColor='$primary600'
          color='white'
          margin={20}
          width='100%'
          maxWidth={300}
          marginHorizontal='auto'
          disabled
        >
          <Text fontWeight='bold' color='white'>
            Ler QRCode
          </Text>
        </Button>
      </TouchableOpacity>
    </View>
  )
}
