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
      width='100%'
      paddingHorizontal={24}
      paddingVertical={8}
    >
      <TouchableOpacity
        style={{ padding: 12 }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5
          name='chevron-left'
          size={24}
          color='#0171BB'
        />
      </TouchableOpacity>

      <View
        flex={1}
        paddingHorizontal={12}
      >
        <Text
          fontWeight='700'
          fontSize='$5'
          textAlign='center'
        >
          {title}
        </Text>
      </View>

      <TouchableOpacity
        style={{ paddingVertical: 8, paddingHorizontal: 12, paddingRight: 0 }}
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
