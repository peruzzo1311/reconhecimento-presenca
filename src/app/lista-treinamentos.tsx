import { useQuery } from '@tanstack/react-query'
import * as Network from 'expo-network'
import { useEffect } from 'react'
import { FlatList } from 'react-native'
import { Spinner, View } from 'tamagui'

import ErrorListaTreinamentos from '@/components/error-lista-treinamentos'
import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import { TrainingItem } from '@/components/training-item'
import { useTrainingStore } from '@/store/treinamento-store'
import { Training } from '@/types'

interface Response {
  msgRet: string
  treinamento: Training[]
}

export default function ListaTreinamentos({ navigation }: any) {
  const { trainingList, setTrainingList } = useTrainingStore()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isPending, refetch, isError } = useQuery({
    queryKey: ['treinamentos'],
    queryFn: async () => {
      const res = await fetch(
        'https://dc.prismainformatica.com.br:8188/SXI-API/G5Rest?server=https://dc.prismainformatica.com.br:8188&module=tr&service=com_prisma_treinamentos&port=getTreinamentos',
        {
          method: 'POST',
          headers: {
            user: 'prisma.integracao',
            pass: '@98fm',
            encryptionType: '0',
            Authorization: '',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numEmp: 1,
          }),
        }
      )

      const data = (await res.json()) as Response

      setTrainingList(data.treinamento)

      return data.treinamento
    },
  })

  useEffect(() => {
    const getNetwork = async () => {
      const network = await Network.getNetworkStateAsync()

      if (!network.isConnected) {
        if (!trainingList || trainingList.length === 0) {
          return <ErrorListaTreinamentos refetch={refetch} />
        }

        return
      }

      refetch()
    }

    getNetwork()
  }, [])

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
        {isPending && (
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

        {trainingList && !isPending && (
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
