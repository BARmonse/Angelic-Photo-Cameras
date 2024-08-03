import axiosClient from '../utils/GenericAxiosClient'

const AuthenticationService = {
  login: async (accessToken: string): Promise<unknown> => {
    return axiosClient.get('/auth/login', {
      params: {
        accessToken: accessToken,
      },
    })
  },
}

export default AuthenticationService
