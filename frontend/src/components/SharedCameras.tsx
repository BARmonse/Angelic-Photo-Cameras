import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SharedCamera } from '../interfaces/SharedCamera'
import SharedCameraService from '../services/SharedCameraService'
import AuthenticationService from '../services/AuthenticationService'
import { SharedCameraDetail } from './SharedCameraDetail'

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
    <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <Text sx={{ fontSize: '3rem' }}>Shared Cameras</Text>
      <Text sx={{ fontSize: '1.5rem' }}>
        {' '}
        These are the cameras shared with your account
      </Text>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {sharedCameras.map((sc) => (
          <SharedCameraDetail camera={sc} />
        ))}
      </Box>
    </Box>
  )
}
