export interface User {
  id: number
  access_token?: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  root_site?: number
  my_cameras_count: number
  shared_cameras_count: number
  total_cameras_count: number
  cameras_with_guests_count: number
  require_qualification: boolean
  available_features: AvailableFeatures
}

interface AvailableFeatures {
  live_view?: boolean
  connect_camera?: boolean
}
