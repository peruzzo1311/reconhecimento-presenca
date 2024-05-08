import React from 'react'
import { FlatList } from 'react-native'
import { View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import PresenceItem from '@/components/presence-item'
import { useTrainingStore } from '@/store/treinamento-store'

interface ListaPresencaProps {
  navigation: any
}

export default function ListaPresenca({ navigation }: ListaPresencaProps) {
  const { training } = useTrainingStore()

  // const handleValidatePresence = () => {
  //   navigation.navigate('Camera')
  // }

  if (!training) {
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
        title={training.nomCua}
      />

      <View
        flex={1}
        padding={24}
      >
        <FlatList
          data={training.participantes}
          keyExtractor={(item) => item.numCpf.toString()}
          renderItem={({ item }) => <PresenceItem participant={item} />}
        />
      </View>

      {/* <TouchableOpacity onPress={handleValidatePresence}>
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
      </TouchableOpacity> */}
    </View>
  )
}
