import * as Network from 'expo-network'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Spinner, View } from 'tamagui'

import getTreinamentos from '@/api/get-treinamentos'
import ErrorListaTreinamentos from '@/components/error-lista-treinamentos'
import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import { TrainingItem } from '@/components/training-item'
import { useTrainingStore } from '@/store/treinamento-store'

export default function ListaTreinamentos({ navigation }: any) {
  const { trainingList, setTrainingList } = useTrainingStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getTreinamentosList = async () => {
    try {
      setIsLoading(true)

      const treinamentos = await getTreinamentos()

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
        if (!trainingList || trainingList.length === 0) {
          return <ErrorListaTreinamentos navigation={navigation} />
        }

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
        {isLoading && (
          <View
            flex={1}
            justifyContent='center'
          >
            <Spinner
              size='large'
              color='$primary600'
            />
          </View>
        )}

        {trainingList && !isLoading && (
          <FlatList
            data={trainingList}
            renderItem={({ item }) => (
              <TrainingItem
                item={item}
                navigation={navigation}
              />
            )}
            ItemSeparatorComponent={() => <View marginVertical={12} />}
            keyExtractor={(item) =>
              item.codCua.toString() + item.tmaCua.toString()
            }
          />
        )}
      </View>
    </View>
  )
}
