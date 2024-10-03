import React, { forwardRef } from 'react'
import { Input, InputProps } from 'tamagui'

interface CustomInputProps extends InputProps {
  secureTextEntry?: boolean
}

const CustomInput = forwardRef<Input, CustomInputProps>((props, ref) => {
  return (
    <Input
      backgroundColor='transparent'
      flex={1}
      padding={0}
      borderWidth={0}
      color='#000'
      ref={ref}
      {...props}
    />
  )
})

export default CustomInput
