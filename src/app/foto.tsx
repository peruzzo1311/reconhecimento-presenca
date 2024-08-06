import { Entypo } from '@expo/vector-icons'
import { useToastController } from '@tamagui/toast'
import Constants from 'expo-constants'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Image, Text, View } from 'tamagui'

import { RecognitionValidate } from '@/api/validate-presence'
import { useTrainingStore } from '@/store/treinamento-store'

interface FotoProps {
  route: {
    params: {
      photo: {
        base64: string
        uri: string
      }
    }
  }
  navigation: any
}

export default function Foto({ route, navigation }: FotoProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { photo } = route.params

  const {
    trainingList,
    selectedTraining,
    selectedParticipant,
    setTrainingList,
    setSelectedTraining,
  } = useTrainingStore()

  const toast = useToastController()

  const setPresence = () => {
    if (!selectedTraining || !selectedParticipant) {
      return
    }

    const trainingIndex = trainingList.findIndex(
      (training) => training.codCua === selectedTraining.codCua
    )

    if (trainingIndex === -1) {
      return
    }

    const newTrainingList = [
      ...trainingList,
      {
        ...trainingList[trainingIndex],
        participantes: trainingList[trainingIndex].participantes.map(
          (participant) => {
            if (participant.numCad === selectedParticipant.numCad) {
              return {
                ...participant,
                staFre: 'Presente' as 'Presente',
              }
            }

            return participant
          }
        ),
      },
    ]

    setSelectedTraining(newTrainingList[trainingIndex])
    setTrainingList(newTrainingList)
  }

  const handleValidate = async () => {
    try {
      setIsLoading(true)

      if (!selectedParticipant) {
        toast.show('Participante não selecionado', {
          native: true,
          burntOptions: {
            haptic: 'error',
            preset: 'error',
          },
        })
        navigation.navigate('ListaPresenca')

        return
      }

      const { codRet, msgRet } = await RecognitionValidate({
        participants: selectedParticipant.fotCol ?? '',
        base64: photo.base64,
      })

      if (codRet !== 0) {
        toast.show(msgRet ?? 'Erro ao verificar presença', {
          native: true,
          burntOptions: {
            haptic: 'error',
            preset: 'error',
          },
        })
        navigation.navigate('ListaPresenca')

        return
      }

      setPresence()
      navigation.navigate('ListaPresenca')
    } catch (error) {
      console.error(error)

      toast.show('Não foi possível verificar presença', {
        native: true,
        burntOptions: {
          haptic: 'error',
          preset: 'error',
        },
      })
      navigation.navigate('ListaPresenca')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View flex={1} backgroundColor='white'>
      <View height={Constants.statusBarHeight} backgroundColor='$primary600' />

      <View
        position='absolute'
        top={40}
        left={20}
        zIndex={10}
        opacity={isLoading ? 0.5 : 1}
      >
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 12,
            backgroundColor: '#0171bb',
          }}
          disabled={isLoading}
          onPress={() => navigation.navigate('Camera')}
        >
          <Entypo name='chevron-left' size={28} color='white' />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: photo.uri,
        }}
        flex={1}
      />

      <View position='absolute' bottom={20} right={20} left={20}>
        <TouchableOpacity onPress={handleValidate}>
          <Button
            backgroundColor='$primary600'
            pointerEvents='none'
            disabled={isLoading}
            opacity={isLoading ? 0.5 : 1}
          >
            <Text fontWeight='700' fontSize='$5' color='white'>
              {isLoading ? 'Validando...' : 'Validar presença'}
            </Text>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  )
}
