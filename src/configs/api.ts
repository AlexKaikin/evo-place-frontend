import axios from 'axios'
import { token } from '@utils'
import { SERVER_URL } from './url'

export const api = axios.create({
  baseURL: SERVER_URL + '/api',
})

export const options = {
  multipart: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  json: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
}

api.interceptors.request.use(async config => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    const { cookies } = await import('next/headers')
    const accessToken = cookies().get('accessToken')?.value
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  } else {
    const accessToken = token.getAccess()
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  }

  return config
})
