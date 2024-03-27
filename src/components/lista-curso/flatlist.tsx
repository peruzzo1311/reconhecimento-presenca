import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FlatList } from 'react-native'
import { Spinner, Text, View } from 'tamagui'

import { ItemTreinamento } from './item-curso'

import { Treinamento } from '@/types'

interface Response {
  msgRet: string
  treinamento: Treinamento[]
}

interface FlatListCursoProps {
  type: 'listagem' | 'validacao'
}

export function FlatlistCurso({ type }: FlatListCursoProps) {
  const navigation: any = useNavigation()
  const { data, isPending, error } = useQuery({
    queryKey: ['cursos'],
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

  if (isPending) {
    return (
      <View justifyContent='center'>
        <Spinner
          size='large'
          color='$primary600'
        />
      </View>
    )
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <View>
      <FlatList
        data={data.treinamento}
        renderItem={({ item }) => (
          <ItemTreinamento
            item={item}
            type={type}
            navigation={navigation}
          />
        )}
        ItemSeparatorComponent={() => <View marginVertical={12} />}
        keyExtractor={(item) => item.codCua.toString() + item.tmaCua.toString()}
      />
    </View>
  )
}
