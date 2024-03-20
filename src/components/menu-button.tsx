import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ReactElement } from 'react'
import { Button, Text, View } from 'tamagui'

interface MenuButtonProps {
  label: string
  icon: ReactElement<typeof FontAwesome>
  route: string
  type?: 'listagem' | 'validacao'
}

export function MenuButton({ label, icon, route, type }: MenuButtonProps) {
  const navigation: any = useNavigation()

  function handleNavigation() {
    if (!type) {
      return navigation.push(route)
    }

    navigation.push(route, {
      type,
    })
  }

  return (
    <View
      flex={1}
      justifyContent='center'
      alignItems='center'
    >
      <Button
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width={125}
        height={125}
        backgroundColor='$primary600'
        borderRadius={15}
        borderWidth={2}
        borderColor='white'
        elevationAndroid={8}
        pressStyle={{
          backgroundColor: '$primary700',
          scale: 0.95,
        }}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
        onPress={handleNavigation}
      >
        {icon && icon}

        <Text
          color='white'
          fontWeight='700'
        >
          {label}
        </Text>
      </Button>
    </View>
  )
}
