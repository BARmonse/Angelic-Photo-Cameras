import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { Box } from '@chakra-ui/react'

interface Props {
  format: string
  url: string
}

const VideoPlayer = ({ format, url }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Used to handle mjpeg files
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (format === 'hls' && videoRef.current) {
      const video = videoRef.current
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(url)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url
        video.addEventListener('canplay', () => {
          video.play()
        })
      }
    } else if (format === 'mp4' || format === 'mpegts') {
      if (videoRef.current) {
        const video = videoRef.current
        video.src = url
        video.addEventListener('error', (e) => {
          console.error('Error Message: ', e)
        })
        video.addEventListener('canplay', () => {
          video.play()
        })
      }
    } else if (format === 'mjpeg' && imageRef.current) {
      const img = imageRef.current
      img.src = url
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ''
      }
      if (imageRef.current) {
        imageRef.current.src = ''
      }
    }
  }, [format, url])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 4,
      }}
    >
      {format === 'mjpeg' ? (
        <img ref={imageRef} alt="MJPEG Stream" />
      ) : (
        <video ref={videoRef} controls />
      )}
    </Box>
  )
}

export default VideoPlayer
