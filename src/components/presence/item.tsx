import { TouchableOpacity } from 'react-native'
import { Avatar, Text, View } from 'tamagui'

import { Participants } from '@/types'

interface PresenceItemProps {
  participant: Participants
  setOpenPresenceDialog: (open: boolean) => void
  setParticipant: (participant: Participants) => void
}

export default function PresenceItem({
  participant,
  setOpenPresenceDialog,
  setParticipant,
}: PresenceItemProps) {
  const handlePress = () => {
    setParticipant(participant)
    setOpenPresenceDialog(true)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        backgroundColor='white'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        gap={12}
        paddingVertical={12}
      >
        <Avatar
          size='$5'
          circular
        >
          <Avatar.Image
            source={{
              uri: `data:image/jpeg;base64,${participant.fotCol}`,
            }}
          />

          <Avatar.Fallback
            delayMs={600}
            backgroundColor='gray4'
          />
        </Avatar>

        <View flex={1}>
          <Text
            fontWeight='bold'
            fontSize='$4'
          >
            {participant.nomFun}
          </Text>
        </View>

        <View alignItems='center'>
          {participant.isPresent && (
            <View
              borderWidth={1}
              borderColor='$green6'
              backgroundColor='$green3'
              borderRadius='$radius.9'
              paddingHorizontal={8}
              paddingVertical={4}
            >
              <Text
                color='$green11'
                fontWeight='700'
                fontSize='$2'
              >
                Presente
              </Text>
            </View>
          )}

          {!participant.isPresent && (
            <View
              borderWidth={1}
              borderColor='$red6'
              backgroundColor='$red3'
              borderRadius='$radius.9'
              paddingHorizontal={8}
              paddingVertical={4}
            >
              <Text
                color='$red11'
                fontWeight='700'
                fontSize='$2'
              >
                Não confirmado
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}
