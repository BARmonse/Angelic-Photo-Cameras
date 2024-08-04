import { CameraSegment } from './CameraSegment'

export interface CameraRecord {
  start: Date
  end: Date
  segments: CameraSegment[]
}
