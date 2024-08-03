import { User } from '../interfaces/User'
import axiosClient from '../utils/GenericAxiosClient'

const AuthenticationService = {
  login: async (accessToken: string): Promise<User> => {
    return axiosClient.get('/auth/login', {
      params: {
        accessToken: accessToken,
      },
    })
  },

  getLoggedUser: (): User | null => {
    const user = sessionStorage.getItem('loggedUser')

    if (!user) return null

    return JSON.parse(user)
  },
}

export default AuthenticationService
