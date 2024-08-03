import { LoggedUser } from '../interfaces/LoggedUser'
import axiosClient from '../utils/GenericAxiosClient'

const AuthenticationService = {
  login: async (accessToken: string): Promise<LoggedUser> => {
    return axiosClient.get('/auth/login', {
      params: {
        accessToken: accessToken,
      },
    })
  },

  getLoggedUser: (): LoggedUser | null => {
    const user = sessionStorage.getItem('loggedUser')

    if (!user) return null

    return JSON.parse(user)
  },
}

export default AuthenticationService
