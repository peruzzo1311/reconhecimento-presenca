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
    'https://senior.soororenner.com.br/SXI-API/G5Rest?server=https://senior.soororenner.com.br&module=tr&service=com_prisma_treinamentos&port=getColaboradores',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
        encryptionType: 0,
        user: 'app.treinamento',
        pass: '@98fm12',
      },
    }
  )

  const data = res.data as Response

  return data
}
