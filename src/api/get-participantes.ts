import axios from 'axios'

import { Training } from '@/types'

interface props {
  tmaCua: number
  codCua: number
  tenant: string
}

interface Response {
  msgRet: string
  treinamento: Training
}

export default async function getParticipantes({ tmaCua, codCua, tenant }: props) {
  const res = await axios.post(
    `${tenant}/API/G5Rest?server=${tenant}/&module=tr&service=com_prisma_treinamentos&port=getTreinamentos`,
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
