export interface CameraRecording {
  id: number
  status: string
  retention: string
  deactivated_at: Date
  record_queue_capacity: number
  recording_start: Date
  recording_end: Date
}
