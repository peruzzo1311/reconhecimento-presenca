import axios from 'axios'

interface getTokenParams {
  username: string
  password: string
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

interface getUserParams {
  username: string
  token: string
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
