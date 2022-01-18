import { useRef, useEffect, useContext, useState, forwardRef } from 'react'
import { AppContext, FileContext } from '../context'
import { Flex, AspectRatio, Container } from '@chakra-ui/react'

const VideoDisplay = ({ videoContainerRef }) => {

  const { uploadedVideo, setUploadedVideo, videoStatus } = useContext(FileContext)
  const [ playerSource, setPlayerSource ] = useState(null)
  const { videoSettingsRef } = useContext(AppContext)
  const ratio = useRef( 16/9 )
  // console.log(ratio.current)

  // listen for changes to videoURL on context provider
  useEffect(()=> {
    // assuming there's only one video
    // first convert to object URL (data parsed is raw file)
    if(playerSource == null && uploadedVideo.length != 0) {
      const url = URL.createObjectURL(uploadedVideo[0])
      videoContainerRef.current.src = url
      // setPlayerSource(url)
    } else {
      return
    }

  }, [uploadedVideo]) // look at this


  const handlePlay = (ev) => {
    videoStatus.current = {
      ...videoStatus.current,
      currentTime: ev.target.currentTime,
      seeking: ev.target.seeking,
      pause: ev.target.pause,
      error: ev.target.error
    }
  }

  const setRatio = (ev) => {
    const vw = videoContainerRef.current.videoWidth
    const vh = videoContainerRef.current.videoHeight
    ratio.current = Math.round(vw / vh)
    
    videoStatus.current = {
      ...videoStatus.current,
      duration: ev.target.duration,
    }

  }

  const VideoInput = forwardRef((props, ref) => {
    const { src, type, ...newProps} = props

    return (
      <video ref={ref} {...newProps}>
        <source src={src} type={type} />
      </video>
    )
  })


  return (
    <Container
      maxWidth="45vw" maxHeight="45vh"
    >
      <AspectRatio ratio={ ratio.current }>
        <VideoInput ref={videoContainerRef}
          autoload = "metadata"
          onLoadedMetadata = { setRatio }
          onTimeUpdate = { handlePlay }
          type="video/mp4" 
          src = { playerSource } />
      </AspectRatio>
    </Container>
  )
}

export default VideoDisplay
