import { toast } from 'react-toastify'
import { create } from 'zustand'
import type { Login, Register, User } from '@/types/auth'
import { authService } from '@services'
import { token } from '@utils'

export type Auth = {
  user: User | null
  loading: boolean
  error: null | string
  register: (data: Register) => void
  login: (data: Login) => void
  logout: () => void
  getMe: () => void
  update: (data: User) => void
}

const status = {
  authorized: (user: User) => ({ user: user, loading: false, error: null }),
  unauthorized: { user: null, loading: false, error: 'unauthorized' },
  error: { loading: false, error: 'error' },
}

export const useAuth = create<Auth>()(set => ({
  user: null,
  loading: false,
  error: null,
  register: async data => {
    try {
      set(() => ({ loading: true }))
      const { data: resData } = await authService.register(data)
      const { user, accessToken, refreshToken } = resData
      token.setAll(accessToken, refreshToken)
      set(() => status.authorized(user))
      toast.info('You are registered')
    } catch (error) {
      set(() => status.unauthorized)
      toast.info('Something went wrong. Try again!')
    }
  },
  login: async data => {
    try {
      set(() => ({ loading: true }))
      const { data: resData } = await authService.login(data)
      const { user, accessToken, refreshToken } = resData
      token.setAll(accessToken, refreshToken)
      set(() => status.authorized(user))
      toast.info('You are logged in')
    } catch (error) {
      toast.info('Something went wrong. Try again!')
      set(() => status.unauthorized)
    }
  },
  logout: () => {
    token.removeAll()
    set(() => status.unauthorized)
    toast.info('You are logged out of your account')
  },
  getMe: async () => {
    try {
      set(() => ({ loading: true }))
      const { data: resData } = await authService.getMe()
      const { user, accessToken, refreshToken } = resData
      token.setAll(accessToken, refreshToken)
      set(() => status.authorized(user))
    } catch (error) {
      set(() => status.unauthorized)
    }
  },
  update: async data => {
    try {
      set(() => ({ loading: true }))
      const { data: user } = await authService.update(data)
      set(() => status.authorized(user))
      toast.info('Profile updated')
    } catch (error) {
      set(() => status.error)
      toast.info('Something went wrong. Try again!')
    }
  },
}))
