import { Entypo } from '@expo/vector-icons'
import { useToastController } from '@tamagui/toast'
import Constants from 'expo-constants'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Image, Text, View } from 'tamagui'

import { validatePresence } from '@/api/validate-presence'
import { useDialogStore } from '@/store/dialog'
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

  const { setParticipantPresence } = useTrainingStore()
  const { data } = useDialogStore()
  const toast = useToastController()

  const handleValidate = async () => {
    try {
      setIsLoading(true)

      const { codRet, msgRet, detail } = await validatePresence({
        participants: data.participant?.fotCol ?? '',
        base64: photo.base64,
      })

      if (codRet !== 0 || (detail?.codRet && detail?.codRet !== 0)) {
        toast.show(msgRet.length > 0 ? msgRet : 'Erro ao verificar presença')
        navigation.navigate('Camera')

        return
      }

      setParticipantPresence(data.participant?.numCpf ?? '')
      navigation.push('ListaPresenca')
    } catch (error) {
      console.log(error)
      toast.show('Não foi possível verificar presença')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <View
        height={Constants.statusBarHeight}
        backgroundColor='$primary600'
      />

      <View
        position='absolute'
        top={40}
        left={20}
        zIndex={10}
        opacity={isLoading ? 0.5 : 1}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#0171bb',
          }}
          disabled={isLoading}
          onPress={() => navigation.goBack()}
        >
          <Entypo
            name='chevron-left'
            size={28}
            color='white'
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: photo.uri,
        }}
        flex={1}
      />

      <View
        position='absolute'
        bottom={20}
        right={20}
        left={20}
      >
        <TouchableOpacity onPress={handleValidate}>
          <Button
            backgroundColor='$primary600'
            pointerEvents='none'
            disabled={isLoading}
            opacity={isLoading ? 0.5 : 1}
          >
            <Text
              fontWeight='700'
              fontSize='$5'
              color='white'
            >
              {isLoading ? 'Validando...' : 'Validar presença'}
            </Text>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  )
}
