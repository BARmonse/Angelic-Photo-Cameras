import axiosClient from '../utils/GenericAxiosClient'

const HealthService = {
  health: (): Promise<string> => {
    return axiosClient.get('/health')
  },
}

export default HealthService
