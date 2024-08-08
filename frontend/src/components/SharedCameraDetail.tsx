import { Box, Button, Text } from '@chakra-ui/react'
import VideoPlayer from './VideoPlayer'
import { useEffect, useState } from 'react'
import { CameraStream } from '../interfaces/CameraStream'
import { useLocation, useNavigate } from 'react-router-dom'
import { SharedCamera } from '../interfaces/SharedCamera'
import SharedCameraService from '../services/SharedCameraService'
import AuthenticationService from '../services/AuthenticationService'
import { SlActionUndo } from 'react-icons/sl'

export const SharedCameraDetail = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const cameraId = params.get('id')
  const [sharedCamera, setSharedCamera] = useState<SharedCamera>()

  const navigate = useNavigate()

  const video: CameraStream | undefined = sharedCamera?.streams.find(
    (s) => s.format === 'hls' || s.format === 'mjpeg',
  )

  useEffect(() => {
    const fetchSharedCamera = async () => {
      const loggedUser = AuthenticationService.getLoggedUser()

      if (!loggedUser || !loggedUser.access_token || !cameraId) return

      const sc = await SharedCameraService.getSharedCamera(
        loggedUser.access_token,
        Number(cameraId),
      )
      setSharedCamera(sc)
    }

    fetchSharedCamera()
  }, [cameraId])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDrection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Button
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '.5rem',
          }}
          onClick={() => navigate('/shared-cameras')}
        >
          <SlActionUndo />
          <Text sx={{ color: 'gray', cursor: 'pointer' }}>
            Return to shared cameras
          </Text>
        </Button>
      </Box>

      <Box
        sx={{
          flexDirection: 'column',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '.6rem',
        }}
      >
        {sharedCamera?.name}
        {video && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <VideoPlayer format={video.format} url={video.url} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
