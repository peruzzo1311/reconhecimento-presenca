import { Toast as TamaguiToast, useToastState } from '@tamagui/toast'

declare module '@tamagui/toast' {
  interface CustomData {
    type?: 'error' | 'success' | 'warning'
  }
}

export default function Toast() {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <TamaguiToast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation='quick'
      paddingVertical='$2.5'
      paddingHorizontal='$4'
      backgroundColor={currentToast.type === 'error' ? '$red9' : '$green9'}
      width='100%'
      maxWidth={350}
    >
      <TamaguiToast.Title
        color='#fff'
        fontWeight='bold'
        fontSize='$5'
        textAlign='center'
      >
        {currentToast.title}
      </TamaguiToast.Title>
    </TamaguiToast>
  )
}
