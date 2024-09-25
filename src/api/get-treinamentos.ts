import RNFetchBlob from 'rn-fetch-blob'

import { Training } from '@/types'

interface Response {
  msgRet: string
  treinamento: Training[]
}

export default async function getTreinamentos() {
  RNFetchBlob.config({
    trusty: true,
  })
    .fetch(
      'POST',
      'https://senior.soororenner.com.br/SXI-API/G5Rest?server=https://senior.soororenner.com.br&module=tr&service=com_prisma_treinamentos&port=getTreinamentos',
      {
        user: 'app.treinamento',
        pass: '@98fm12',
        encryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        lisTod: 'S',
        lisPar: 'N',
      })
    )
    .then((res) => {
      const data = res.json()

      console.log(data)
    })

  // if (!Array.isArray(data.treinamento)) {
  //   return [data.treinamento]
  // }

  // return data.treinamento
}
