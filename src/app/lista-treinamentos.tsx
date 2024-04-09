import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FlatList } from 'react-native'
import { Spinner, View, Text } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import { TrainingItem } from '@/components/training-item'
import { Training } from '@/types'

interface Response {
  msgRet: string
  treinamento: Training[]
}

export default function ListaTreinamentos({ navigation }: any) {
  const { data, isPending, error } = useQuery({
    queryKey: ['treinamentos'],
    queryFn: async () => {
      const res = await axios.post<Response>(
        'https://dc.prismainformatica.com.br:8188/SXI-API/G5Rest?server=https://dc.prismainformatica.com.br:8188&module=tr&service=com_prisma_treinamentos&port=getTreinamentos',
        JSON.stringify({
          numEmp: 1,
        }),
        {
          headers: {
            user: 'prisma.integracao',
            pass: '@98fm',
            encryptionType: '0',
            Authorization: '',
            'Content-Type': 'application/json',
          },
        }
      )

      return res.data
    },
  })

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
          <View justifyContent='center'>
            <Spinner
              size='large'
              color='$primary600'
            />
          </View>
        )}

        {error && <Text>{error.message}</Text>}

        {data && !error && !isPending && (
          <FlatList
            data={data.treinamento}
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
