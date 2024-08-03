import { CameraOwner } from './CameraOwner'
import { CameraSnapshot } from './CameraSnapshot'
import { CameraStream } from './CameraStream'

export interface SharedCamera {
  id: number
  name: string
  type: string
  snapshot?: CameraSnapshot
  status: string
  live_snapshot?: string
  streams: CameraStream[]
  owner: CameraOwner
  has_recording: boolean
  has_notifications: boolean
}
