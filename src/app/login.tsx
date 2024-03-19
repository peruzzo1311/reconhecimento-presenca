import { useToastController } from '@tamagui/toast'
import { Check } from 'lucide-react-native'
import { useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Checkbox, Image, Input, Label, Text, View } from 'tamagui'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const toast = useToastController()

  const usernameInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSubmit = () => {
    try {
      setIsLoading(true)

      if (!username || !password) {
        toast.show('Preencha corretamente todos os campos')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View
          flex={1}
          backgroundColor='$primary600'
        >
          <View
            height='40%'
            paddingHorizontal={20}
          >
            <Image
              source={require('@/assets/logo.png')}
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
              <Text fontWeight='600'>Usuário</Text>

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
              />
            </View>

            <View gap={4}>
              <Text fontWeight='600'>Senha</Text>

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
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginVertical: 10,
              }}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Checkbox
                size='$5'
                id='showPassword'
                borderWidth={2}
                checked={showPassword}
                backgroundColor={showPassword ? '$primary600' : '#fff'}
                borderColor={showPassword ? '$primary600' : '#ddd'}
                disabled={isLoading}
              >
                <Checkbox.Indicator>
                  <Check color='#fff' />
                </Checkbox.Indicator>
              </Checkbox>

              <Label htmlFor='showPassword'>Mostrar senha</Label>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit}>
              <Button backgroundColor='$primary600'>
                <Text
                  color='white'
                  fontWeight='600'
                >
                  Entrar
                </Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
