import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ReactElement } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, Text } from 'tamagui'

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
    <TouchableOpacity onPress={handleNavigation}>
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
        pointerEvents='none'
      >
        {icon && icon}

        <Text
          color='white'
          fontWeight='700'
        >
          {label}
        </Text>
      </Button>
    </TouchableOpacity>
  )
}
