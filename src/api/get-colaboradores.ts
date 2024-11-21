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
    'https://senior.plumaagro.com.br:8181/API/G5Rest?server=https://senior.plumaagro.com.br:8181/&module=tr&service=com_prisma_treinamentos&port=getColaboradores',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
        encryptionType: 0,
        user: 'integracao.app',
        pass: 'D3v@98fm',
      },
    }
  )

  const data = res.data as Response

  return data
}
