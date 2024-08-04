import { StreamControls } from './StreamControls'

export interface CameraStreamRecording {
  url: string
  format: string
  stream_controls: StreamControls
}
