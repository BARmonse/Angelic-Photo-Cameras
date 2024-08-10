import { Box, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SharedCamera } from '../interfaces/SharedCamera'
import SharedCameraService from '../services/SharedCameraService'
import AuthenticationService from '../services/AuthenticationService'
import { SharedCameraPreview } from './SharedCameraPreview'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'

export const SharedCameras = () => {
  const navigate = useNavigate()

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

  const handleOnClickLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        height: '100dvh',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '.3rem',
            justifyContent: 'center',
          }}
          onClick={handleOnClickLogout}
        >
          <HiOutlineLogout />
          <Text>Logout</Text>
        </Button>
      </Box>
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
          <SharedCameraPreview key={sc.id} camera={sc} />
        ))}
      </Box>
    </Box>
  )
}
