import { useToastController } from '@tamagui/toast'
import { ArrowLeft, AtSign } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { Button, Image, Text, View } from 'tamagui'

import CustomInput from '@/components/input'
import InputContainer from '@/components/input-container'
import { useUserStore } from '@/store/user-store'
import { validateTenant } from '@/api/login'

export default function Login({ navigation }: { navigation: any }) {
  const [newTenant, setNewTenant] = useState('')

  const { tenant, setTenant, setHomDomain, setProdDomain } = useUserStore()
  const toast = useToastController()

  useEffect(() => {
    if (tenant) {
      setNewTenant(tenant)
    }
  }, [])

  const handleChangeTenant = async () => {
    try {
      if (!newTenant) {
        toast.show('Informe o tenant', {
          type: 'error',
        })

        return
      }

      const tenantResponse = await validateTenant({ code: 1, tenant: newTenant })

      if (tenantResponse.retorno !== 'Cliente Válido') {
        toast.show('Tenant inválido', {
          type: 'error',
        })

        return
      }

      setHomDomain(tenantResponse.dominioHom || '')
      setProdDomain(tenantResponse.dominioProd || '')

      setTenant(newTenant)
      navigation.goBack()
    } catch (error) {
      console.log(error)

      toast.show('Ocorreu um erro ao alterar o tenant', {
        type: 'error',
      })
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
          <InputContainer label='Tenant'>
            <AtSign
              size={22}
              color='#aaa'
              style={{
                marginLeft: 10,
              }}
            />

            <CustomInput
              placeholder='@tenant.com.br'
              autoCapitalize='none'
              value={newTenant}
              onChangeText={setNewTenant}
              onSubmitEditing={handleChangeTenant}
            />
          </InputContainer>

          <TouchableOpacity onPress={handleChangeTenant}>
            <Button pointerEvents='none' backgroundColor='#0171BB' marginTop={20}>
              <Text color='white' fontWeight='700'>
                Confirmar
              </Text>
            </Button>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
