import { CameraRecord } from '../interfaces/CameraRecord'
import { CameraStreamRecording } from '../interfaces/CameraStreamRecording'
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

  getSharedCamera: async (
    accessToken: string,
    cameraId: number,
  ): Promise<SharedCamera> => {
    return axiosClient.get('/shared-camera', {
      params: {
        accessToken: accessToken,
        cameraId: cameraId,
      },
    })
  },

  getSharedCameraRecords: async (
    accessToken: string,
    cameraId: number,
  ): Promise<CameraRecord> => {
    return axiosClient.get(`shared-cameras/${cameraId}/records`, {
      params: {
        accessToken: accessToken,
      },
    })
  },

  getSharedCameraRecordingStream: async (
    accessToken: string,
    cameraId: number,
    startDate: Date,
    endDate?: Date,
  ): Promise<CameraStreamRecording> => {
    return axiosClient.get(`/shared-cameras/recording/${cameraId}/stream`, {
      params: {
        accessToken: accessToken,
        startDate: startDate,
        endDate: endDate,
      },
    })
  },
}

export default SharedCameraService
