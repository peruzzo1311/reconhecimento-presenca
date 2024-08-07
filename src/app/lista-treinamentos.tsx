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
import { useTrainingStore } from '@/store/treinamento-store'
import { Training } from '@/types'

export default function ListaTreinamentos({ navigation }: any) {
  const [trainings, setTrainings] = useState<Training[]>([])
  const { setTrainingList } = useTrainingStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getTreinamentosList = async () => {
    try {
      setIsLoading(true)

      const treinamentos = await getTreinamentos()

      if (!Array.isArray(treinamentos)) {
        setTrainingList([treinamentos])
        setTrainings([treinamentos])
      }

      setTrainings(treinamentos)
      setTrainingList(treinamentos)
    } catch (error) {
      console.error(error)

      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getNetwork = async () => {
      const network = await Network.getNetworkStateAsync()

      if (!network.isConnected) {
        // if (!trainingList || trainingList.length === 0) {
        //   return <ErrorListaTreinamentos navigation={navigation} />
        // }

        return
      }

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

      <HeaderNavigation navigation={navigation} title='Lista de Treinamentos' />

      <View flex={1} paddingHorizontal={24} paddingBottom={12}>
        {!isLoading && (
          <FlatList
            data={trainings}
            renderItem={({ item }) => (
              <TrainingItem item={item} navigation={navigation} />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View marginVertical={12} />}
            keyExtractor={(item) =>
              item.codCua.toString() + item.tmaCua.toString()
            }
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getTreinamentosList}
              />
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
