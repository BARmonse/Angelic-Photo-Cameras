import { CameraRecording } from '../interfaces/CameraRecording'
import { PaginatedResult } from '../interfaces/PaginatedResult'
import axiosClient from '../utils/GenericAxiosClient'

const RecordingService = {
  getCameraRecordings: async (
    accessToken: string,
    cameraId: number,
  ): Promise<PaginatedResult<CameraRecording>> => {
    return axiosClient.get(`/camera/${cameraId}/recordings`, {
      params: {
        accessToken: accessToken,
      },
    })
  },
}

export default RecordingService
