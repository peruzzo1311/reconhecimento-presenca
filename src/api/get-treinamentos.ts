import axios from 'axios'

import { Training } from '@/types'

interface Response {
  msgRet: string
  treinamento: Training[]
}

export default async function getTreinamentos() {
  const res = await axios.post(
    'https://dc.prismainformatica.com.br:8188/SXI-API/G5Rest?server=https://dc.prismainformatica.com.br:8188&module=tr&service=com_prisma_treinamentos&port=getTreinamentos',
    {
      numEmp: 1,
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

  const data = res.data as Response

  if (!Array.isArray(data.treinamento)) {
    return [data.treinamento]
  }

  return data.treinamento
}
