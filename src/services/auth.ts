import type { Login, Register, UserResponse, User } from '@/types/auth'
import { api, options } from '@configs'
import { token } from '@utils'

export const authService = {
  register(values: Register) {
    return api.post<UserResponse>(`auth/register`, values)
  },
  login(values: Login) {
    return api.post<UserResponse>(`auth/login`, values)
  },
  getMe() {
    return api.post<UserResponse>(
      `auth/me`,
      { refreshToken: token.getRefresh() },
      options.json
    )
  },
  update(values: User) {
    return api.patch<User>(`users`, values, options.json)
  },
  uploadUserAvatar(formData: FormData) {
    return api.post('/upload', formData, options.multipart)
  },
}
