import { ActivityIndicator } from 'react-native'
import { View } from 'tamagui'

export default function Spinner() {
  return (
    <View
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor='rgba(0, 0, 0, 0.5)'
      justifyContent='center'
      alignItems='center'
      zIndex={10}
    >
      <ActivityIndicator color='#fff' />
    </View>
  )
}
