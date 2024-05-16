import * as Network from 'expo-network'
import React, { useEffect } from 'react'
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
  const { training } = useTrainingStore()

  useEffect(() => {
    async function checkConnection() {
      const connection = await Network.getNetworkStateAsync()
      if (!connection.isConnected) {
        navigation.navigate('Offline')
      }
    }

    checkConnection()
  }, [])

  const handleValidatePresence = () => {
    navigation.navigate('QRCode')
  }

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
          Ler QRCode
        </Button>
      </TouchableOpacity>
    </View>
  )
}
