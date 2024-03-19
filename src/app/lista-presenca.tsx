import { PencilRuler, Trash2 } from 'lucide-react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Stack, Text, XStack } from 'tamagui'

const Listapresenca = (props: any) => {
  const listaPresencaArray = [
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos almedia junior silva',
    },
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos',
    },
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos',
    },
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos',
    },
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos',
    },
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos',
    },
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos',
    },
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos',
    },
    {
      curso: 'Treinamento X',
      data: '01/01/2021',
      presenca: true,
      nome: 'João Carlos',
    },
  ]
  const renderItens = ({ item, index }: { item: any; index: number }) => {
    return (
      <XStack
        justifyContent='space-between'
        padding={8}
        borderWidth={1}
        marginVertical={4}
        borderColor='lightgray'
      >
        <Stack>
          <Text>{item.curso}</Text>
          <Text>{item.data}</Text>
        </Stack>
        <Text
          width='25%'
          flexWrap='wrap'
        >
          {item.nome}
        </Text>
        <Text>{item.presenca ? 'Presente' : 'Falta'}</Text>
        <Stack space={4}>
          <Button
            elevation={4}
            backgroundColor='$primary50'
            circular
          >
            <PencilRuler color='#0171BB' />
          </Button>
          <Button
            elevation={4}
            backgroundColor='$red12'
            circular
          >
            <Trash2 color='red' />
          </Button>
        </Stack>
      </XStack>
    )
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        alignItems: 'center',
      }}
    >
      <XStack
        justifyContent='space-between'
        alignItems='center'
        width='100%'
      >
        <Button />
        <Text>Treinamento X</Text>
        <Button />
      </XStack>

      <FlatList
        style={{
          width: Dimensions.get('window').width,
          zIndex: 0,
        }}
        contentContainerStyle={{
          paddingHorizontal: 4,
          zIndex: 0,
        }}
        data={listaPresencaArray}
        renderItem={renderItens}
        keyExtractor={(item, index) => index.toString()}
      />

      <Stack bottom={2}>
        <Button>Validar Presença</Button>
      </Stack>
    </SafeAreaView>
  )
}

export default Listapresenca
