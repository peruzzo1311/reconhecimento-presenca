import { memo } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Avatar, Text, View } from 'tamagui'

import { QrCodeValidate } from '@/api/validate-presence'
import { useOfflineStore } from '@/store/offline-store'
import { ParticipantePresence } from '@/types'
import { useUserStore } from '@/store/user-store'

interface ItemParticipantSyncProps {
  item: ParticipantePresence
  codCua: number
  tmaCua: number
  participantsList: ParticipantePresence[]
  setParticipantsList: (participants: ParticipantePresence[]) => void
  setIsLoading: (loading: boolean) => void
}

function ItemParticipantSync({
  item,
  codCua,
  tmaCua,
  participantsList,
  setParticipantsList,
  setIsLoading,
}: ItemParticipantSyncProps) {
  const { removeParticipantOffline } = useOfflineStore()
  const { prodDomain } = useUserStore()

  const handlePress = () => {
    Alert.alert('Confirmar Presença', `Deseja confirmar a presença de ${item.nomFun}?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Confirmar',
        onPress: () => handleConfirmPresence(),
      },
    ])
  }

  const handleConfirmPresence = async () => {
    try {
      setIsLoading(true)
      const response = await QrCodeValidate({
        codCua,
        tmaCua,
        participantes: [
          {
            numEmp: item.numEmp,
            tipCol: item.tipCol,
            numCad: item.numCad,
            datFre: item.datFre,
            horFre: item.horFre,
          },
        ],
        tenant: prodDomain,
      })

      if (response.msgRet !== 'ok') {
        Alert.alert('Erro', response.msgRet ?? 'Ocorreu um erro ao confirmar a presença')

        return
      }

      const updatedParticipants = participantsList.filter(
        (participant) => participant.numCad !== item.numCad
      )

      removeParticipantOffline(codCua, tmaCua, item.numCad)
      setParticipantsList(updatedParticipants)
      Alert.alert('Sucesso', 'Presença confirmada com sucesso')
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Ocorreu um erro ao confirmar a presença')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        backgroundColor='white'
        flexDirection='row'
        alignItems='center'
        gap={12}
        paddingVertical={12}
      >
        <Avatar size='$5' circular>
          <Avatar.Image
            accessibilityLabel='Foto do participante'
            source={{
              uri: `data:image/jpeg;base64,${item.fotCol}`,
            }}
          />

          <Avatar.Fallback
            justifyContent='center'
            alignItems='center'
            delayMs={600}
            backgroundColor='$gray4'
          >
            <Text color='$text-primary' fontWeight='700' fontSize='$7'>
              {item.nomFun[0].toUpperCase()}
            </Text>
          </Avatar.Fallback>
        </Avatar>

        <View gap={4} flexShrink={1}>
          <Text fontSize='$4' flexShrink={1}>
            {item.nomFun}
          </Text>

          <View flexDirection='row' alignItems='center' gap={4}>
            <Text fontSize='$3' color='gray'>
              {item.datFre}
            </Text>

            <Text fontSize='$3' color='gray'>
              -
            </Text>

            <Text fontSize='$3' color='gray'>
              {item.horFre}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default memo(ItemParticipantSync)
