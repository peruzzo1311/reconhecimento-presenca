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
  const res = await axios.post('https://prismaappfr.azurewebsites.net/verifica-presenca', {
    fotPar: base64,
    participantes: participants,
    platform: 'android',
  })

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
    numCpf: string | number
    datFre: string
    horFre: string
  }[]
  tenant: string
}

export async function QrCodeValidate({ codCua, tmaCua, participantes, tenant }: QrCodeProps) {
  const res = await axios.post(
    `${tenant}/API/G5Rest?server=${tenant}/&module=tr&service=com_prisma_treinamentos&port=postFrequencia`,
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
        user: 'integracao.app',
        pass: 'D3v@98fm',
      },
    }
  )

  const data = await res.data

  return data
}
