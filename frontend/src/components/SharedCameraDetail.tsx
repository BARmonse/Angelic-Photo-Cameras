import { Box, Button, Text } from '@chakra-ui/react'
import VideoPlayer from './VideoPlayer'
import { useEffect, useState } from 'react'
import { CameraStream } from '../interfaces/CameraStream'
import { useLocation, useNavigate } from 'react-router-dom'
import { SharedCamera } from '../interfaces/SharedCamera'
import SharedCameraService from '../services/SharedCameraService'
import AuthenticationService from '../services/AuthenticationService'
import { SlActionUndo } from 'react-icons/sl'
import { CameraRecord } from '../interfaces/CameraRecord'
import { CameraSegment } from '../interfaces/CameraSegment'
import { CameraStreamRecording } from '../interfaces/CameraStreamRecording'

export const SharedCameraDetail = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const cameraId = Number(params.get('id'))
  const [sharedCamera, setSharedCamera] = useState<SharedCamera>()
  const [cameraRecord, setCameraRecord] = useState<CameraRecord>()
  const [selectedSegment, setSelectedSegment] = useState<CameraSegment>()
  const [cameraStreamRecording, setCameraStreamRecording] =
    useState<CameraStreamRecording>()

  const navigate = useNavigate()

  const video: CameraStream | undefined = sharedCamera?.streams.find(
    (s) => s.format === 'hls' || s.format === 'mjpeg',
  )

  useEffect(() => {
    const fetchSharedCameraAndRecordings = async () => {
      const loggedUser = AuthenticationService.getLoggedUser()

      if (!loggedUser || !loggedUser.access_token || !cameraId) return

      const sc = await SharedCameraService.getSharedCamera(
        loggedUser.access_token,
        cameraId,
      )
      setSharedCamera(sc)

      const r = await SharedCameraService.getSharedCameraRecords(
        loggedUser.access_token,
        cameraId,
      )
      setCameraRecord(r)
    }

    fetchSharedCameraAndRecordings()
  }, [cameraId])

  useEffect(() => {
    const fetchSharedCameraSegment = async () => {
      const loggedUser = AuthenticationService.getLoggedUser()

      if (
        !loggedUser ||
        !loggedUser.access_token ||
        !cameraId ||
        !selectedSegment
      )
        return

      const streamRecording =
        await SharedCameraService.getSharedCameraRecordingStream(
          loggedUser.access_token,
          cameraId,
          selectedSegment.start,
          selectedSegment.end,
        )
      setCameraStreamRecording(streamRecording)
    }
    fetchSharedCameraSegment()
  }, [cameraId, selectedSegment])

  const formatTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}/${month}/${day}-${hours}:${minutes}:${seconds}`
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '2rem',
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
              width: '50%',
            }}
          >
            <VideoPlayer format={video.format} url={video.url} />
          </Box>
        )}
      </Box>
      {!cameraRecord || cameraRecord?.segments.length === 0 ? (
        <Text sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Not available records
        </Text>
      ) : (
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
          <Text sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            These are some of the recordings from yesterday:
          </Text>
          <Box sx={{ display: 'flex', gap: '.5rem', flexDirection: 'column' }}>
            {cameraRecord?.segments.map((s, index) => (
              <Text
                key={index}
                sx={{
                  fontWeight: 'lighter',
                  cursor: 'pointer',
                  color: selectedSegment === s ? 'green' : 'inherit',
                }}
                onClick={() => setSelectedSegment(s)}
              >
                {' '}
                {`- Record from ${formatTimestamp(s.start)} to ${formatTimestamp(s.end)}`}
              </Text>
            ))}
          </Box>
        </Box>
      )}

      {cameraStreamRecording && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            maxWidth: '50%',
          }}
        >
          <VideoPlayer
            format={cameraStreamRecording.format}
            url={cameraStreamRecording.url}
          />
        </Box>
      )}
    </Box>
  )
}
