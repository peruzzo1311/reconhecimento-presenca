import { AntDesign } from '@expo/vector-icons'
import { useToastController } from '@tamagui/toast'
import { AtSign, Lock, User } from 'lucide-react-native'
import { useEffect, useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { Button, Checkbox, Image, ScrollView, Text, View } from 'tamagui'

import { getToken, getUser } from '@/api/login'
import CustomInput from '@/components/input'
import InputContainer from '@/components/input-container'
import { useUserStore } from '@/store/user-store'

interface fetchProps {
  username: string
  tenant: string
  password: string
}

export default function Login({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const toast = useToastController()
  const { user, setUser, tenant } = useUserStore()

  const usernameInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      if (!tenant) {
        toast.show('Informe o Tenant para continuar', {
          type: 'error',
        })
        setIsLoading(false)

        return
      }

      if (!username || !password) {
        toast.show('Preencha corretamente todos os campos', {
          type: 'error',
        })
        setIsLoading(false)

        return
      }

      await fetchLogin({ username, tenant, password })
    } catch (error) {
      console.log(error)

      toast.show('Erro ao tentar fazer o login, verifique sua conexão', {
        type: 'error',
      })

      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLogin = async ({ username, tenant, password }: fetchProps) => {
    const responseGetToken = await getToken({ username, tenant, password })

    if (responseGetToken.status === 401) {
      toast.show('Usuário ou senha inválidos', {
        type: 'error',
      })
      usernameInputRef.current?.focus()
      setIsLoading(false)

      return
    }

    if (responseGetToken.status === 429) {
      const data = await responseGetToken.json()

      toast.show(data.message, {
        type: 'error',
      })
      setIsLoading(false)

      return
    }

    if (responseGetToken.status !== 200) {
      toast.show('Erro ao tentar fazer o login', {
        type: 'error',
      })
      setIsLoading(false)

      return
    }

    const data = await responseGetToken.json()
    const token = JSON.parse(data.jsonToken).access_token as string

    const user = await getUser({ username, token })

    if (!user) {
      toast.show('Usuário ou senha inválidos', {
        type: 'error',
      })
      setIsLoading(false)

      return
    }

    setUser({ ...user, username, password })
    navigation.navigate('ListaTreinamentos')
  }

  useEffect(() => {
    if (user && tenant && user.username && user.password) {
      setIsLoading(true)

      setUsername(user.username)
      setPassword(user.password)

      fetchLogin({
        username: user.username,
        tenant,
        password: user.password,
      })
    }
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#0171BB' }}
      >
        <View alignItems='center' height='30%' paddingHorizontal={20}>
          <Image
            source={require('@/assets/images/logo.png')}
            width='100%'
            height='100%'
            maxWidth={500}
            objectFit='contain'
          />
        </View>

        <View
          flex={1}
          backgroundColor='white'
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
          padding={20}
          width='100%'
        >
          <ScrollView showsVerticalScrollIndicator={false} flex={1}>
            <TouchableOpacity onPress={() => navigation.navigate('TenantScreen')}>
              <InputContainer label='Tenant' backgroundColor='$gray3'>
                <AtSign
                  size={22}
                  color='#aaa'
                  style={{
                    marginLeft: 10,
                  }}
                />

                <CustomInput
                  placeholder='@tenant.com.br'
                  value={tenant || ''}
                  readOnly
                  pointerEvents='none'
                />
              </InputContainer>
            </TouchableOpacity>

            <InputContainer backgroundColor={isLoading ? '$gray4' : 'white'} label='Usuário'>
              <User
                size={22}
                color='#aaa'
                style={{
                  marginLeft: 10,
                }}
              />

              <CustomInput
                placeholder='nome.sobrenome'
                autoCapitalize='none'
                returnKeyType='next'
                value={username}
                onChangeText={setUsername}
                ref={usernameInputRef}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                backgroundColor={isLoading ? '$gray4' : 'white'}
                disabled={isLoading}
              />
            </InputContainer>

            <InputContainer backgroundColor={isLoading ? '$gray4' : 'white'} label='Senha'>
              <Lock
                size={22}
                color='#aaa'
                style={{
                  marginLeft: 10,
                }}
              />

              <CustomInput
                placeholder='Digite sua senha'
                enterKeyHint='send'
                secureTextEntry={!showPassword}
                ref={passwordInputRef}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleSubmit}
                backgroundColor={isLoading ? '$gray4' : 'white'}
                disabled={isLoading}
              />
            </InputContainer>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginVertical: 20,
                width: 200,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Checkbox
                justifyContent='center'
                alignItems='center'
                size='$5'
                borderWidth={2}
                checked={showPassword}
                backgroundColor={showPassword ? '#0171BB' : '#fff'}
                borderColor={showPassword ? '#0171BB' : '#ddd'}
                disabled={isLoading}
                pointerEvents='none'
              >
                <Checkbox.Indicator>
                  <AntDesign name='check' size={16} color='white' />
                </Checkbox.Indicator>
              </Checkbox>

              <Text>Mostrar senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={isLoading ? undefined : handleSubmit}>
              <Button pointerEvents='none' backgroundColor='#0171BB' opacity={isLoading ? 0.5 : 1}>
                <Text color='white' fontWeight='700'>
                  {isLoading ? 'Carregando...' : 'Entrar'}
                </Text>
              </Button>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
