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
      lisTod: 'S',
      lisPar: 'N',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer sN6Zm7Ly7KJn4RuruaoiWqR1H0zudsEa',
      },
    }
  )

  const data = res.data as Response

  if (!Array.isArray(data.treinamento)) {
    return [data.treinamento]
  }

  return data.treinamento
}
