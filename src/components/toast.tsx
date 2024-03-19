import { Toast as TamaguiToast, useToastState } from '@tamagui/toast'

export function Toast() {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <TamaguiToast
      key={currentToast.id}
      duration={2500}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      y={0}
      opacity={1}
      scale={1}
      animation='quick'
      viewportName={currentToast.viewportName}
      backgroundColor='$red10'
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
