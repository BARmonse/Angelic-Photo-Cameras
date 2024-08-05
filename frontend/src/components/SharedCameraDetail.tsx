import { Box } from '@chakra-ui/react'
import { SharedCamera } from '../interfaces/SharedCamera'
import VideoPlayer from './VideoPlayer'

interface Props {
  camera: SharedCamera
}

export const SharedCameraDetail = ({ camera }: Props) => {
  console.log(camera)
  return (
    <Box
      sx={{
        borderRadius: '25%',
        border: `1px solid red`,
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
        }}
      >
        {camera.streams.map((stream) => (
          <VideoPlayer format={stream.format} url={stream.url} />
        ))}
      </Box>
    </Box>
  )
}
