import { memo, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar, Text, View } from 'tamagui'

import { useDialogStore } from '@/store/dialog'
import { useOfflineStore } from '@/store/offline-store'
import { Participant } from '@/types'

interface PresenceItemProps {
  participant: Participant
}

function PresenceItem({ participant }: PresenceItemProps) {
  const { presences } = useOfflineStore()
  const { onOpen } = useDialogStore()

  useEffect(() => {
    presences.map((presence) => {
      if (presence.participante.numCad === participant.numCad) {
        participant.staFre = 'Sincronizar'
      }
    })
  }, [])

  const handleAvatarPress = () => {
    onOpen('avatar', { participant })
  }

  return (
    <View
      backgroundColor='white'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      gap={12}
      paddingVertical={12}
    >
      <TouchableOpacity onPress={handleAvatarPress}>
        <Avatar size='$5' circular>
          <Avatar.Image
            source={{
              uri: `data:image/jpeg;base64,${participant.fotCol}`,
            }}
          />

          <Avatar.Fallback delayMs={600} backgroundColor='gray4' />
        </Avatar>
      </TouchableOpacity>

      <View flex={1}>
        <Text fontWeight='bold' fontSize='$4'>
          {participant.nomFun}
        </Text>
      </View>

      <View alignItems='center'>
        {participant.staFre === 'Presente' && (
          <View
            borderWidth={1}
            borderColor='$green6'
            backgroundColor='$green3'
            borderRadius='$radius.9'
            paddingHorizontal={8}
            paddingVertical={4}
          >
            <Text color='$green11' fontWeight='700' fontSize='$2'>
              Presente
            </Text>
          </View>
        )}

        {participant.staFre === 'Ausente' && (
          <View
            borderWidth={1}
            borderColor='$red6'
            backgroundColor='$red3'
            borderRadius='$radius.9'
            paddingHorizontal={8}
            paddingVertical={4}
          >
            <Text color='$red11' fontWeight='700' fontSize='$2'>
              Não confirmado
            </Text>
          </View>
        )}

        {participant.staFre === 'Sincronizar' && (
          <View
            borderWidth={1}
            borderColor='$yellow6'
            backgroundColor='$yellow3'
            borderRadius='$radius.9'
            paddingHorizontal={8}
            paddingVertical={4}
          >
            <Text color='$yellow11' fontWeight='700' fontSize='$2'>
              Sincronizar
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default memo(PresenceItem)
