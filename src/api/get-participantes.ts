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
    'https://senior.plumaagro.com.br:8181/API/G5Rest?server=https://senior.plumaagro.com.br:8181/&module=tr&service=com_prisma_treinamentos&port=getTreinamentos',
    {
      lisTod: 'N',
      lisPar: 'S',
      tmaCua,
      codCua,
    },
    {
      headers: {
        user: 'integracao.app',
        pass: 'D3v@98fm',
        encryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  const data = res.data as Response

  return data.treinamento
}
