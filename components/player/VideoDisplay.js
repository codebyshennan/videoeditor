import { AspectRatio } from '@chakra-ui/react'
import { useRef, useEffect, useContext, useState } from 'react'

const VideoDisplay = () => {
  const fileUpload = useRef()
  const videoCanvas = useRef()
  const videoContainer = useRef()

  const [ videoSrc, setVideoSrc] = useState()
  const [ videoReadiness, setVideoReadiness ] = useState({
    scale : 0,
    ready: false,
  })
  
  // get the prop from the uploaded video

  const uploadFile = (ev) => {
    setVideoSrc(URL.createObjectURL(ev.target.files[0]))
  }

  const readyToPlay = (ev) => {
    setVideoReadiness({
      scale: Math.min(videoCanvas.current.width / videoContainer.current.videoWidth, 
        videoCanvas.current.height / videoContainer.current.videoHeight),
      ready: true
    })
    console.log(videoContainer.current)
    console.log(videoReadiness)
    videoContainer.current.load()
    videoContainer.current.play()
    requestAnimationFrame(updateCanvas)
  }

  const updateCanvas = () => {
    const ctx = videoCanvas.current.getContext('2d')

    ctx.clearRect(0,0, videoCanvas.current.width, videoCanvas.current.height)

    if(videoReadiness.ready) {
      // videoContainer.current.muted = muted
      const scale = videoReadiness.scale
      const videoH = videoContainer.current.videoHeight
      const videoW = videoContainer.current.videoWidth
      const top = videoCanvas.current.height / 2 - (videoH / 2) * scale
      const left = videoCanvas.current.width / 2 - (videoW / 2) * scale

      ctx.drawImage(videoContainer.current, left, top, videoW * scale, videoH * scale)
    }

    requestAnimationFrame(updateCanvas)
  }
  
  useEffect(() => {
    videoCanvas.current.style.width="100%"
    videoCanvas.current.style.height="100%"
    videoCanvas.current.width = videoCanvas.current.offsetWidth
    videoCanvas.current.height = videoCanvas.current.offsetHeight
  }, [])


  return (
    <>
      <canvas ref={videoCanvas}></canvas>
      <video ref={videoContainer} onCanPlay={ readyToPlay }>
        <source src={videoSrc} type="video/mp4" /> 
      </video>
    </>
  )
}

export default VideoDisplay
