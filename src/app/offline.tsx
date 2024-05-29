import { View, Text } from 'tamagui'

export default function Offline() {
  return (
    <View
      padding={20}
      flex={1}
      justifyContent='center'
      alignItems='center'
    >
      <Text
        fontSize='$6'
        fontWeight='bold'
      >
        Offline
      </Text>
    </View>
  )
}
