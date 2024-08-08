import { Box } from '@chakra-ui/react'
import { SharedCamera } from '../interfaces/SharedCamera'
import { useNavigate } from 'react-router-dom'

interface Props {
  camera: SharedCamera
}

export const SharedCameraPreview = ({ camera }: Props) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        flexDirection: 'column',
        fontWeight: 'bold',
      }}
    >
      {camera.name}
      <Box
        sx={{
          display: 'flex',
          gap: '.8rem',
          padding: '1rem',
          border: `1px solid gray`,
          maxWidth: '20rem',
          maxHeight: '20rem',
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/shared-camera?id=${camera.id}`)}
      >
        <img src={camera.live_snapshot} />
      </Box>
    </Box>
  )
}
