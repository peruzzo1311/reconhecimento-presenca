import { useQuery } from '@tanstack/react-query'
import { FlatList, TouchableOpacity } from 'react-native'
import { Button, Spinner, Text, View } from 'tamagui'

import { Header } from '@/components/header'
import { HeaderNavigation } from '@/components/header-navigation'
import { TrainingItem } from '@/components/training-item'
import { Training } from '@/types'

interface Response {
  msgRet: string
  treinamento: Training[]
}

export default function ListaTreinamentos({ navigation }: any) {
  const { data, isPending, error, refetch } = useQuery({
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

      return data
    },
  })

  const refreshScreenOnError = () => {
    refetch()
  }

  if (error) {
    return (
      <View
        flex={1}
        justifyContent='center'
        alignItems='center'
      >
        <Text
          fontSize='$5'
          fontWeight='bold'
        >
          Erro ao carregar treinamentos
        </Text>

        <TouchableOpacity onPress={refreshScreenOnError}>
          <Button
            backgroundColor='$primary600'
            color='white'
            margin={20}
            width='100%'
            maxWidth={300}
            marginHorizontal='auto'
            pointerEvents='none'
          >
            Tentar novamente
          </Button>
        </TouchableOpacity>
      </View>
    )
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
