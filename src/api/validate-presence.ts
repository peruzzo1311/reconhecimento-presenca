import axios from 'axios'
import { Platform } from 'react-native'

import { Participant, ResponseDefault } from '@/types'

interface validatePresenceProps {
  participants: Participant[] | string
  base64: string
}

interface validatePresenceResponse extends ResponseDefault {
  codRet: number
  msgRet: string
}

export async function RecognitionValidate({
  participants,
  base64,
}: validatePresenceProps): Promise<validatePresenceResponse> {
  const res = await axios.post(
    'https://api-presenca-iqqsmwkmla-rj.a.run.app/verifica-presenca',
    {
      fotPar: base64,
      participantes: participants,
      platform: Platform.OS,
    }
  )

  const data = await res.data

  return data.detail
}

interface QrCodeProps {
  codCua: number
  tmaCua: number
  participantes: {
    numEmp: number
    tipCol: number
    numCad: number
    datFre: string
    horFre: string
  }
}

export async function QrCodeValidate({
  codCua,
  tmaCua,
  participantes,
}: QrCodeProps) {
  const res = await axios.post(
    'https://dc.prismainformatica.com.br:8188/SXI-API/G5Rest?server=https://dc.prismainformatica.com.br:8188&module=tr&service=com_prisma_treinamentos&port=postFrequencia',
    {
      codCua,
      tmaCua,
      participantes,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
        encryptionType: 0,
        user: 'prisma.integracao',
        pass: '@98fm',
      },
    }
  )

  const data = await res.data

  return data
}
