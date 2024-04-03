import { Toast, useToastState } from '@tamagui/toast'

export function CurrentToast() {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      width='100%'
      maxWidth={400}
      marginHorizontal='auto'
      backgroundColor='$red10'
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation='quick'
    >
      <Toast.Title
        fontWeight='700'
        color='white'
        fontSize='$5'
        textAlign='center'
      >
        {currentToast.title}
      </Toast.Title>
    </Toast>
  )
}
