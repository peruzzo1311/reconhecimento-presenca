import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Text, View } from 'tamagui'

import { HeaderNavigation } from '@/components/header-navigation'

interface ListaCursoProps {
  route: {
    params: {
      type: 'listagem' | 'validacao'
    }
  }
  navigation: any
}

export default function ListaCurso({ route, navigation }: ListaCursoProps) {
  const { type } = route.params

  const handleNavigation = () => {
    navigation.push('ListaPresenca', {
      training: 1,
      type,
    })
  }

  return (
    <View
      flex={1}
      backgroundColor='white'
    >
      <HeaderNavigation
        navigation={navigation}
        title='Cursos'
      />

      <View padding={24}>
        <TouchableOpacity
          style={{ overflow: 'hidden', borderRadius: 15 }}
          onPress={handleNavigation}
        >
          <View
            borderWidth={2}
            borderColor='$primary600'
            borderRadius={15}
          >
            <View
              backgroundColor='$primary600'
              alignItems='center'
              paddingVertical={4}
            >
              <Text
                color='white'
                fontWeight='700'
                fontSize={20}
              >
                Treinamento X
              </Text>
            </View>

            <View
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              padding={16}
            >
              <FontAwesome5
                name='user-graduate'
                size={32}
                color='#0171BB'
              />

              <View
                flexDirection='column'
                gap={8}
              >
                <View
                  alignItems='center'
                  flexDirection='row'
                >
                  <View width={24}>
                    <FontAwesome5
                      name='calendar-alt'
                      size={16}
                      color='#0171BB'
                    />
                  </View>

                  <Text>Data: 18/03/2024</Text>
                </View>

                <View
                  alignItems='center'
                  flexDirection='row'
                >
                  <View width={24}>
                    <FontAwesome5
                      name='map-marker-alt'
                      size={16}
                      color='#0171BB'
                    />
                  </View>

                  <Text>Local: Auditório 2</Text>
                </View>
              </View>

              <FontAwesome5
                name='chevron-right'
                size={20}
                color='#0171BB'
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
