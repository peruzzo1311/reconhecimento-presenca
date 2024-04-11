import { CameraCapturedPicture } from 'expo-camera'

import { Participant, ResponseDefault } from '@/types'

interface validatePresenceProps {
  participants: Participant[]
  photo: CameraCapturedPicture
}

interface validatePresenceResponse extends ResponseDefault {
  participante: Participant
}

export async function validatePresence({
  participants,
  photo,
}: validatePresenceProps): Promise<validatePresenceResponse> {
  const res = await fetch(
    'https://prismaappfr.azurewebsites.net/verifica-presenca',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fotPar: photo.base64,
        participantes: participants,
      }),
    }
  )

  const data = await res.json()

  return data
}
