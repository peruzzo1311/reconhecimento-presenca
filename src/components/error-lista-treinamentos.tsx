import { TouchableOpacity } from 'react-native'
import { View, Text, Button } from 'tamagui'

interface ErrorListaTreinamentosProps {
  navigation: any
}

export default function ErrorListaTreinamentos({
  navigation,
}: ErrorListaTreinamentosProps) {
  return (
    <View flex={1} justifyContent='center' alignItems='center'>
      <Text fontSize='$5' fontWeight='bold'>
        Erro ao carregar treinamentos
      </Text>

      <Text fontSize='$3' marginVertical={8}>
        Verifique sua conexão com a internet
      </Text>

      <TouchableOpacity onPress={() => navigation.replace('ListaTreinamentos')}>
        <Button
          backgroundColor='#0171BB'
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
