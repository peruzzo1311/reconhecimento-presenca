import { Entypo } from '@expo/vector-icons'
import { useToastController } from '@tamagui/toast'
import { format } from 'date-fns'
import Constants from 'expo-constants'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image, Text, View, Button } from 'tamagui'

import { QrCodeValidate, RecognitionValidate } from '@/api/validate-presence'
import { Participant, Training } from '@/types'
import { useUserStore } from '@/store/user-store'

interface FotoProps {
  route: {
    params: {
      photo: {
        base64: string
        uri: string
      }
      participant: Participant
      training: Training
    }
  }
  navigation: any
}

export default function Foto({ route, navigation }: FotoProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { photo, participant, training } = route.params

  const toast = useToastController()

  const { prodDomain } = useUserStore()

  const handleValidate = async () => {
    try {
      setIsLoading(true)

      if (!participant) {
        toast.show('Participante não selecionado', {
          type: 'error',
        })
        navigation.navigate('ListaPresenca', { training })

        return
      }

      const { codRet, msgRet } = await RecognitionValidate({
        participants: participant.fotCol ?? '',
        base64: photo.base64,
      })

      if (codRet !== 0) {
        toast.show(msgRet ?? 'Erro ao verificar presença', {
          type: 'error',
        })
        navigation.navigate('ListaPresenca', { training })

        return
      }

      const res = await QrCodeValidate({
        codCua: training.codCua,
        tmaCua: training.tmaCua,
        participantes: [
          {
            numEmp: participant.numEmp,
            tipCol: participant.tipCol,
            numCad: participant.numCad,
            numCpf: participant.numCpf,
            datFre: format(new Date(), 'dd/MM/yyyy'),
            horFre: format(new Date(), 'HH:mm:ss'),
          },
        ],
        tenant: prodDomain,
      })

      if (res.msgRet !== 'ok') {
        toast.show(res.msgRet ?? 'Erro ao verificar presença', {
          type: 'error',
        })
        navigation.navigate('ListaPresenca', { training })

        return
      }

      navigation.navigate('ListaPresenca', { training })
    } catch (error) {
      console.error(error)

      toast.show('Não foi possível verificar presença', {
        type: 'error',
      })
      navigation.navigate('ListaPresenca', { training })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View flex={1} backgroundColor='white'>
      <View height={Constants.statusBarHeight} backgroundColor='#0171BB' />

      <View position='absolute' top={40} left={20} zIndex={10} opacity={isLoading ? 0.5 : 1}>
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 12,
            backgroundColor: '#0171bb',
          }}
          disabled={isLoading}
          onPress={() =>
            navigation.navigate('Camera', {
              training,
              participant,
            })
          }
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
            backgroundColor='#0171BB'
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
