import { useToastController } from '@tamagui/toast'
import * as Network from 'expo-network'
import { FlatList, TouchableOpacity } from 'react-native'
import { Button, View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import PresenceItem from '@/components/presence-item'
import { useTrainingStore } from '@/store/treinamento-store'

interface ListaPresencaProps {
  navigation: any
}

export default function ListaPresenca({ navigation }: ListaPresencaProps) {
  const { selectedTraining } = useTrainingStore()
  const toast = useToastController()

  const handleFaceRecognition = async () => {
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

    navigation.navigate('Camera')
  }

  if (!selectedTraining) {
    return null
  }

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <Header />

      <HeaderNavigation
        navigation={navigation}
        title={selectedTraining.nomCua}
      />

      <View
        flex={1}
        padding={24}
      >
        <FlatList
          data={selectedTraining.participantes}
          keyExtractor={(item) => item.numCpf.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleFaceRecognition}>
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
          pointerEvents='none'
        >
          Ler QRCode
        </Button>
      </TouchableOpacity>
    </View>
  )
}
