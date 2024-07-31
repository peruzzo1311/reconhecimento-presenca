import axios from 'axios'

interface Response {
  msgRet: string
  colaboradores: {
    nomFun: string
    numCad: number
    tipCol: number
    numEmp: number
    numCpf: number | string
  }[]
}

export default async function getColaboradores() {
  const res = await axios.post(
    'https://dc.prismainformatica.com.br:8188/SXI-API/G5Rest?server=https://dc.prismainformatica.com.br:8188&module=tr&service=com_prisma_treinamentos&port=getColaboradores',
    {},
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

  return data
}
