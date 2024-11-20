import axios from 'axios'

interface getTokenParams {
  username: string
  password: string
}

interface getUserParams {
  username: string
  token: string
}

interface validateTenantParams {
  code: number
  tenant: string
}

interface validateTenantResponse {
  retorno: string
  dominioHom?: string
  dominioProd?: string
}

export async function getToken({ username, password }: getTokenParams) {
  const body = {
    username: `${username.trim()}@prisma-demo.com.br.seniorx`,
    password,
  }

  const res = await fetch(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/authentication/actions/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  return res
}

export async function getUser({ username, token }: getUserParams) {
  const res = await axios.post(
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/getUser',
    {
      username,
      includePhoto: true,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }
  )

  const data = await res.data

  return data
}

export async function validateTenant({ code, tenant }: validateTenantParams) {
  const res = await axios.post(
    'https://sistemas.prismainformatica.com.br:8181/SXI/G5Rest?server=https://sistemas.prismainformatica.com.br:8181/&module=sapiens&service=com_prisma_app&port=validarTenant',
    {
      codigo: code,
      tenant,
    },
    {
      headers: {
        user: 'integracao.app',
        pass: 'S@p1ens',
        encryptionType: '0',
        Authorization: '',
        'Content-Type': 'application/json',
      },
    }
  )

  const data = res.data as validateTenantResponse

  return data
}
