import { Box, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { SharedCamera } from '../interfaces/SharedCamera'
import VideoPlayer from './VideoPlayer'
import { useState } from 'react'
import { CameraStream } from '../interfaces/CameraStream'

interface Props {
  camera: SharedCamera
}

export const SharedCameraDetail = ({ camera }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const video: CameraStream = camera.streams.find(
    (s) => s.format === 'hls' || s.format === 'mjpeg',
  )

  console.log(`Video of camera ${camera.name}: `, video)

  const closeModal = () => {
    setOpenModal(false)
  }

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
        onClick={() => setOpenModal(true)}
      >
        <img src={camera.live_snapshot} />
      </Box>
      <Modal isOpen={openModal} onClose={closeModal}>
        <ModalContent>
          {video && (
            <Box
              sx={{
                backgroundColor: 'white',
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VideoPlayer format={video.format} url={video.url} />
              </Box>
            </Box>
          )}
        </ModalContent>
      </Modal>
    </Box>
  )
}
