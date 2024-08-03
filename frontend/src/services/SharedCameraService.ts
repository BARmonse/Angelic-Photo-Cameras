import { PaginatedResult } from '../interfaces/PaginatedResult'
import { SharedCamera } from '../interfaces/SharedCamera'
import axiosClient from '../utils/GenericAxiosClient'

const SharedCameraService = {
  getSharedCameras: async (
    accessToken: string,
  ): Promise<PaginatedResult<SharedCamera[]>> => {
    return axiosClient.get('/shared-cameras', {
      params: {
        accessToken: accessToken,
      },
    })
  },
}

export default SharedCameraService
