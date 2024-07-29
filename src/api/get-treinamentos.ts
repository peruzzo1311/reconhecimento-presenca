import { Training } from '@/types'

interface Response {
  msgRet: string
  treinamento: Training[]
}

export default async function getTreinamentos() {
  const res = await fetch(
    'https://dc.prismainformatica.com.br:8188/SXI-API/G5Rest?server=https://dc.prismainformatica.com.br:8188&module=tr&service=com_prisma_treinamentos&port=getTreinamentos',
    {
      method: 'POST',
      headers: {
        user: 'prisma.integracao',
        pass: '@98fm',
        encryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numEmp: 1,
      }),
    }
  )

  const data = (await res.json()) as Response

  if (!Array.isArray(data.treinamento)) {
    return [data.treinamento]
  }

  return data.treinamento
}
