import { View, Text, Avatar } from 'tamagui'

import { Participants } from '@/types'

interface PresenceItemProps {
  item: Participants
}

export default function PresenceItem({ item }: PresenceItemProps) {
  return (
    <View
      flexDirection='row'
      alignItems='center'
      paddingVertical={12}
    >
      <Avatar
        size='$6'
        circular
      >
        <Avatar.Image
          source={{
            uri: `data:image/jpeg;base64,${item.fotCol}`,
          }}
        />

        <Avatar.Fallback
          delayMs={600}
          backgroundColor='gray4'
        />
      </Avatar>

      <Text
        fontWeight='bold'
        fontSize='$4'
        marginLeft={12}
      >
        {item.nomFun}
      </Text>
    </View>
  )
}
