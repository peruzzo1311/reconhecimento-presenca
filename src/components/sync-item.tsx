import { memo } from 'react'
import { Text, View } from 'tamagui'

interface Presence {
  codCua: number
  tmaCua: number
  participante: {
    numEmp: number
    tipCol: number
    numCad: number
    nomFun: string
    datFre: string
    horFre: string
  }
}

function ItemSync({ participant }: { participant: Presence }) {
  return (
    <View>
      <Text>{participant.participante.nomFun}</Text>
    </View>
  )
}

export default memo(ItemSync)
