import { Alert, TouchableOpacity } from 'react-native'
import { Avatar, Text, View } from 'tamagui'

import { QrCodeValidate } from '@/api/validate-presence'
import { useOfflineStore } from '@/store/offline-store'
import { ParticipantePresence } from '@/types'

interface ItemParticipantSyncProps {
  item: ParticipantePresence
  codCua: number
  tmaCua: number
  participantsList: ParticipantePresence[]
  setParticipantsList: (participants: ParticipantePresence[]) => void
}

export default function ItemParticipantSync({
  item,
  codCua,
  tmaCua,
  participantsList,
  setParticipantsList,
}: ItemParticipantSyncProps) {
  const { presenceOffline, setPresenceOffline } = useOfflineStore()

  const handlePress = () => {
    Alert.alert(
      'Confirmar Presença',
      `Deseja confirmar a presença de ${item.nomFun}?`,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          onPress: () => handleConfirmPresence(),
        },
      ]
    )
  }

  const handleConfirmPresence = async () => {
    try {
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
      })

      if (response.msgRet !== 'ok') {
        Alert.alert(
          'Erro',
          response.msgRet ?? 'Ocorreu um erro ao confirmar a presença'
        )

        return
      }

      removePresenceOffline()

      const updatedParticipants = participantsList.filter(
        (participant) => participant.numCad !== item.numCad
      )

      setParticipantsList(updatedParticipants)
      Alert.alert('Sucesso', 'Presença confirmada com sucesso')
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Ocorreu um erro ao confirmar a presença')
    }
  }

  const removePresenceOffline = () => {
    const training = presenceOffline.find(
      (training) => training.codCua === codCua && training.tmaCua === tmaCua
    )

    if (!training) {
      return
    }

    const updatedTraining = {
      ...training,
      participantes: training.participantes.filter(
        (participant) => participant.numCad !== item.numCad
      ),
    }

    const updatedPresenceOffline = presenceOffline.map((training) => {
      const isUpdatedTraining =
        training.codCua === codCua && training.tmaCua === tmaCua

      if (isUpdatedTraining) {
        return updatedTraining
      }

      return training
    })

    setPresenceOffline(updatedPresenceOffline)
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
