import { useToastController } from '@tamagui/toast'
import { ArrowLeft } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { Button, Image, Input, Text, View } from 'tamagui'

import { useUserStore } from '@/store/user-store'

export default function Login({ navigation }: { navigation: any }) {
  const [newTenant, setNewTenant] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { tenant, setTenant } = useUserStore()
  const toast = useToastController()

  useEffect(() => {
    if (tenant) {
      setNewTenant(tenant)
    }
  }, [])

  const handleChangeTenant = async () => {
    try {
      setIsLoading(true)

      if (!newTenant) {
        toast.show('Informe o tenant', {
          type: 'error',
        })

        return
      }

      setTenant(newTenant)
      navigation.replace('Login')
    } catch (error) {
      console.log(error)

      toast.show('Ocorreu um erro ao alterar o tenant', {
        type: 'error',
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
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            position: 'absolute',
            zIndex: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={30} color='white' />
        </TouchableOpacity>

        <View alignItems='center' height='30%' paddingHorizontal={20}>
          <Image
            source={require('@/assets/images/logo.png')}
            width='100%'
            height='100%'
            maxWidth={300}
            objectFit='contain'
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
          <View>
            <Text fontWeight='700' fontSize='$3' textTransform='uppercase'>
              Tenant
            </Text>

            <Input
              placeholder='@tenant.com.br'
              autoCapitalize='none'
              returnKeyType='next'
              value={newTenant}
              onChangeText={setNewTenant}
              onSubmitEditing={handleChangeTenant}
              backgroundColor={isLoading ? '$gray2' : 'white'}
              pointerEvents={isLoading ? 'none' : 'auto'}
              focusStyle={{ borderColor: '#0171BB', borderWidth: 1 }}
            />
          </View>

          <TouchableOpacity
            onPress={isLoading ? undefined : handleChangeTenant}
          >
            <Button
              pointerEvents='none'
              backgroundColor='#0171BB'
              opacity={isLoading ? 0.5 : 1}
              marginTop={20}
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
