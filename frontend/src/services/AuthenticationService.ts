import axiosClient from '../utils/GenericAxiosClient'

const AuthenticationService = {
  login: async (accessToken: string) => {
    return axiosClient.post('/auth/login', accessToken)
  },
}

export default AuthenticationService
