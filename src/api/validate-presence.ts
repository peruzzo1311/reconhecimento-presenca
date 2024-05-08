import { Platform } from 'react-native'

import { Participant, ResponseDefault } from '@/types'

interface validatePresenceProps {
  participants: Participant[] | string
  base64: string
}

interface validatePresenceResponse extends ResponseDefault {
  detail?: {
    codRet: number
    msgRet: string
  }
}

export async function validatePresence({
  participants,
  base64,
}: validatePresenceProps): Promise<validatePresenceResponse> {
  const res = await fetch(
    'https://prismaappfr.azurewebsites.net/verifica-presenca',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fotPar: base64,
        participantes: participants,
        platform: Platform.OS,
      }),
    }
  )

  const data = await res.json()

  return data
}
