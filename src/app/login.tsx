import { useToastController } from '@tamagui/toast'
import { Check } from 'lucide-react-native'
import { useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { Button, Checkbox, Image, Input, Text, View } from 'tamagui'

import { getToken, getUser } from '@/api/login'
import { useUserStore } from '@/store/user-store'

export default function Login({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const toast = useToastController()
  const { setUser } = useUserStore()

  const usernameInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      if (!username || !password) {
        toast.show('Preencha corretamente todos os campos', {
          native: true,
          burntOptions: {
            haptic: 'error',
            preset: 'error',
          },
        })

        return
      }

      const responseGetToken = await getToken({ username, password })

      if (responseGetToken.status === 401) {
        toast.show('Usuário ou senha inválidos', {
          native: true,
          burntOptions: {
            haptic: 'error',
            preset: 'error',
          },
        })

        return
      }

      if (responseGetToken.status === 429) {
        const data = await responseGetToken.json()

        toast.show(data.message, {
          native: true,
          burntOptions: {
            haptic: 'error',
            preset: 'error',
          },
        })
        return
      }

      if (responseGetToken.status !== 200) {
        toast.show('Erro ao tentar fazer o login', {
          native: true,
          burntOptions: {
            haptic: 'error',
            preset: 'error',
          },
        })
      }

      const data = await responseGetToken.json()
      const token = JSON.parse(data.jsonToken).access_token as string

      const user = await getUser({ username, token })

      if (!user) {
        toast.show('Usuário ou senha inválidos', {
          native: true,
        })

        return
      }

      setUser(user)
      navigation.navigate('Inicio')
    } catch (error) {
      console.log(error)

      toast.show('Erro ao tentar fazer o login, verifique sua conexão', {
        native: true,
        burntOptions: {
          haptic: 'error',
          preset: 'error',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#0171BB' }}
      >
        <View height='30%' paddingHorizontal={20}>
          <Image
            source={require('@/assets/images/logo.png')}
            width='100%'
            height='100%'
            resizeMode='contain'
          />
        </View>

        <View
          flex={1}
          backgroundColor='white'
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
          padding={20}
          paddingTop={40}
          gap={20}
        >
          <View gap={8}>
            <Text fontWeight='700' fontSize='$3' textTransform='uppercase'>
              Usuário
            </Text>

            <Input
              placeholder='nome.sobrenome'
              autoCapitalize='none'
              returnKeyType='next'
              value={username}
              onChangeText={setUsername}
              ref={usernameInputRef}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              backgroundColor={isLoading ? '$gray2' : 'white'}
              pointerEvents={isLoading ? 'none' : 'auto'}
              focusStyle={{ borderColor: '$primary600', borderWidth: 1 }}
            />
          </View>

          <View gap={8}>
            <Text fontWeight='700' fontSize='$3' textTransform='uppercase'>
              Senha
            </Text>

            <Input
              placeholder='Digite sua senha'
              enterKeyHint='send'
              secureTextEntry={!showPassword}
              ref={passwordInputRef}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleSubmit}
              backgroundColor={isLoading ? '$gray2' : 'white'}
              pointerEvents={isLoading ? 'none' : 'auto'}
              focusStyle={{ borderColor: '$primary600', borderWidth: 1 }}
            />
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginVertical: 10,
              width: 200,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Checkbox
              size='$5'
              borderWidth={2}
              checked={showPassword}
              backgroundColor={showPassword ? '$primary600' : '#fff'}
              borderColor={showPassword ? '$primary600' : '#ddd'}
              disabled={isLoading}
              pointerEvents='none'
            >
              <Checkbox.Indicator>
                <Check color='#fff' />
              </Checkbox.Indicator>
            </Checkbox>

            <Text>Mostrar senha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={isLoading ? undefined : handleSubmit}>
            <Button
              pointerEvents='none'
              backgroundColor='$primary600'
              opacity={isLoading ? 0.5 : 1}
            >
              <Text color='white' fontWeight='700'>
                {isLoading ? 'Carregando...' : 'Entrar'}
              </Text>
            </Button>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
