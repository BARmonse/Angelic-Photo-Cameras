import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SharedCamera } from '../interfaces/SharedCamera'
import SharedCameraService from '../services/SharedCameraService'
import AuthenticationService from '../services/AuthenticationService'

export const SharedCameras = () => {
  const [sharedCameras, setSharedCameras] = useState<SharedCamera[]>([])

  const fetchSharedCameras = async () => {
    const loggedUser = AuthenticationService.getLoggedUser()

    if (!loggedUser || !loggedUser.access_token) return

    const cameraPage = await SharedCameraService.getSharedCameras(
      loggedUser.access_token,
    )
    setSharedCameras(cameraPage.results)
  }

  useEffect(() => {
    fetchSharedCameras()
  }, [])

  return (
    <Box>
      Shared cameras
      <Box>
        {sharedCameras.map((sc) => (
          <p>{sc.name}</p>
        ))}
      </Box>
    </Box>
  )
}
