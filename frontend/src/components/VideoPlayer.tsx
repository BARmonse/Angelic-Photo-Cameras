import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

interface Props {
  format: string
  url: string
}

const VideoPlayer = ({ format, url }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Used to handle mpeg files
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
    <div>
      {format === 'mjpeg' ? (
        <img ref={imageRef} alt="MJPEG Stream" style={{ width: '100%' }} />
      ) : (
        <video ref={videoRef} controls style={{ width: '100%' }} />
      )}
    </div>
  )
}

export default VideoPlayer
