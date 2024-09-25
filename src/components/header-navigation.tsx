import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text } from 'tamagui'

interface HeaderNavigationProps {
  navigation: any
  title: string
}

export function HeaderNavigation({ navigation, title }: HeaderNavigationProps) {
  return (
    <View
      flexDirection='row'
      alignItems='center'
      gap={12}
      paddingHorizontal={24}
      paddingVertical={12}
    >
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name='chevron-left' size={24} color='#0171BB' />
      </TouchableOpacity>

      <Text fontWeight='700' fontSize='$5' flex={1}>
        {title}
      </Text>
    </View>
  )
}
