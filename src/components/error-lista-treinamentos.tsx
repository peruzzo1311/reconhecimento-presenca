import { TouchableOpacity } from 'react-native'
import { View, Text, Button } from 'tamagui'

interface ErrorListaTreinamentosProps {
  refetch: () => void
}

export default function ErrorListaTreinamentos({
  refetch,
}: ErrorListaTreinamentosProps) {
  return (
    <View
      flex={1}
      justifyContent='center'
      alignItems='center'
    >
      <Text
        fontSize='$5'
        fontWeight='bold'
      >
        Erro ao carregar treinamentos
      </Text>

      <TouchableOpacity onPress={() => refetch()}>
        <Button
          backgroundColor='$primary600'
          color='white'
          margin={20}
          width='100%'
          maxWidth={300}
          marginHorizontal='auto'
          pointerEvents='none'
        >
          Tentar novamente
        </Button>
      </TouchableOpacity>
    </View>
  )
}
