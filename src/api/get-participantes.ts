import axios from 'axios'

import { Training } from '@/types'

interface Response {
  msgRet: string
  treinamento: Training
}

export default async function getParticipantes({
  tmaCua,
  codCua,
}: {
  tmaCua: number
  codCua: number
}) {
  const res = await axios.post(
    'https://dc.prismainformatica.com.br:8188/SXI-API/G5Rest?server=https://dc.prismainformatica.com.br:8188&module=tr&service=com_prisma_treinamentos&port=getTreinamentos',
    {
      lisTod: 'N',
      lisPar: 'S',
      tmaCua,
      codCua,
    },
    {
      headers: {
        user: 'prisma.integracao',
        pass: '@98fm',
        encryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  const data = res.data as Response

  return data.treinamento
}
