import axios from 'axios'

import { Training } from '@/types'

interface Response {
  msgRet: string
  treinamento: Training[]
}

export default async function getTreinamentos() {
  const res = await axios.post(
    'https://senior.soororenner.com.br/SXI-API/G5Rest?server=https://senior.soororenner.com.br&module=tr&service=com_prisma_treinamentos&port=getTreinamentos',
    {
      lisTod: 'S',
      lisPar: 'N',
    },
    {
      headers: {
        user: 'app.treinamento',
        pass: '@98fm12',
        encryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  const data = res.data as Response

  if (!Array.isArray(data.treinamento)) {
    return [data.treinamento]
  }

  return data.treinamento
}
