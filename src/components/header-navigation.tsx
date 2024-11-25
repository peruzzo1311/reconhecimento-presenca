import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text } from 'tamagui'

interface HeaderNavigationProps {
  navigation: any
  title: string
  canGoBack?: boolean
}

export function HeaderNavigation({ navigation, title, canGoBack = true }: HeaderNavigationProps) {
  return (
    <View
      flexDirection='row'
      alignItems='center'
      gap={12}
      paddingHorizontal={24}
      paddingVertical={canGoBack ? 16 : 20}
    >
      {canGoBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name='chevron-left' size={24} color='#0171BB' />
        </TouchableOpacity>
      )}

      <Text textAlign={canGoBack ? 'left' : 'center'} fontWeight='700' fontSize='$5' flex={1}>
        {title}
      </Text>
    </View>
  )
}
