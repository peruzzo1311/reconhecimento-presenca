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
      justifyContent='space-between'
      alignItems='center'
      paddingHorizontal={24}
      paddingVertical={8}
    >
      <TouchableOpacity
        style={{ padding: 8, paddingLeft: 0 }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5
          name='chevron-left'
          size={24}
          color='#0171BB'
        />
      </TouchableOpacity>

      <Text
        fontWeight='600'
        fontSize={20}
      >
        {title}
      </Text>

      <TouchableOpacity
        style={{ padding: 8, paddingRight: 0 }}
        onPress={() => console.log('filtro')}
      >
        <FontAwesome5
          name='filter'
          size={20}
          color='#0171BB'
        />
      </TouchableOpacity>
    </View>
  )
}
