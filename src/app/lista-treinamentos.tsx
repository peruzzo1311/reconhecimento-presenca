import * as Network from 'expo-network'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { Text, View } from 'tamagui'

import getTreinamentos from '@/api/get-treinamentos'
import ErrorListaTreinamentos from '@/components/error-lista-treinamentos'
import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import TrainingItem from '@/components/training-item'
import { useOfflineStore } from '@/store/offline-store'
import { useTrainingStore } from '@/store/treinamento-store'
import { Training } from '@/types'
import { useUserStore } from '@/store/user-store'

export default function ListaTreinamentos({ navigation }: any) {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const { trainingList } = useTrainingStore()
  const { setIsOffline } = useOfflineStore()
  const { prodDomain } = useUserStore()

  const getTreinamentosList = async () => {
    try {
      setIsLoading(true)

      const treinamentos = await getTreinamentos({ tenant: prodDomain })

      if (!Array.isArray(treinamentos)) {
        setTrainings([treinamentos])

        return
      }

      setTrainings(treinamentos)
    } catch (error) {
      console.error(error)

      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const getOfflineTreinamentos = async () => {
    if (!trainingList || trainingList.length === 0) {
      return <ErrorListaTreinamentos navigation={navigation} />
    }

    setTrainings(trainingList)
  }

  useEffect(() => {
    const getNetwork = async () => {
      const network = await Network.getNetworkStateAsync()

      if (!network.isConnected) {
        setIsOffline(true)
        getOfflineTreinamentos()

        return
      }

      setIsOffline(false)
      getTreinamentosList()
    }

    getNetwork()
  }, [])

  if (isError) {
    return <ErrorListaTreinamentos navigation={navigation} />
  }

  return (
    <View flex={1} backgroundColor='white'>
      <Header />

      <HeaderNavigation navigation={navigation} title='Lista de Treinamentos' canGoBack={false} />

      <View flex={1} paddingHorizontal={24} paddingBottom={12}>
        {!isLoading && (
          <FlatList
            data={trainings}
            renderItem={({ item }) => <TrainingItem item={item} navigation={navigation} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View marginVertical={12} />}
            keyExtractor={(item) => item.codCua.toString() + item.tmaCua.toString()}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getTreinamentosList} />
            }
            ListEmptyComponent={
              !isLoading &&
              ((
                <Text textAlign='center' fontSize='$3' fontWeight='bold'>
                  Nenhum treinamento encontrado
                </Text>
              ) as any)
            }
          />
        )}

        {isLoading && <ActivityIndicator />}
      </View>
    </View>
  )
}
