import { Avatar, Text, View } from 'tamagui'

import { ParticipantePresence } from '@/types'

export default function ItemParticipantSync({
  item,
}: {
  item: ParticipantePresence
}) {
  return (
    <View backgroundColor='white' paddingVertical={12}>
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

      <View gap={4}>
        <Text fontSize='$4'>{item.nomFun}</Text>

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
  )
}
