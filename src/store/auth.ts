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
      set(() => ({ user: user, loading: false }))
      toast.info('Are you registered')
    } catch (error) {
      set(() => ({ error: 'error', loading: false }))
      toast.info('Something went wrong. Try again!')
    }
  },
  login: async data => {
    try {
      set(() => ({ loading: true }))
      const { data: resData } = await authService.login(data)
      const { user, accessToken, refreshToken } = resData
      token.setAll(accessToken, refreshToken)
      set(() => ({ user: user, loading: false }))
      toast.info('You are logged in')
    } catch (error) {
      toast.info('Something went wrong. Try again!')
      set(() => ({ error: 'error', loading: false }))
    }
  },
  logout: () => {
    token.removeAll()
    set(() => ({ user: null }))
    toast.info('You are logged out of your account')
  },
  getMe: async () => {
    try {
      set(() => ({ loading: true }))
      const { data: resData } = await authService.getMe()
      const { user, accessToken, refreshToken } = resData
      token.setAll(accessToken, refreshToken)
      set(() => ({ user: user, loading: false }))
    } catch (error) {
      set(() => ({ error: 'error', loading: false }))
    }
  },
}))
