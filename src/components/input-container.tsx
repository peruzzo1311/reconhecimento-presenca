import { View, Text } from 'tamagui'

interface InputContainerProps {
  children: React.ReactNode
  label: string
  backgroundColor?: string
}

export default function InputContainer({
  children,
  label,
  backgroundColor = '$white',
}: InputContainerProps) {
  return (
    <View gap={4} marginVertical={'$2'}>
      <Text fontWeight='700' fontSize='$3' textTransform='uppercase'>
        {label}
      </Text>

      <View
        borderWidth={1}
        borderColor='$gray4'
        borderRadius={10}
        alignItems='center'
        flexDirection='row'
        gap={10}
        backgroundColor={backgroundColor}
      >
        {children}
      </View>
    </View>
  )
}
