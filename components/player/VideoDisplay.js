import { useRef, useEffect, useContext, useState, forwardRef } from 'react'
import { AppContext, FileContext } from '../../pages/main/index'
import { Flex, AspectRatio, Container } from '@chakra-ui/react'

const VideoDisplay = ({ videoContainerRef }) => {

  const [ playerSource, setPlayerSource ] = useState(null)
  const { videoSettings } = useContext(AppContext)
  const { fileUploads, setFileUploads } = useContext(FileContext)
  const ratio = useRef( 16/9 )
  // console.log(ratio.current)

  // listen for changes to videoURL on context provider
  useEffect(()=> {
    // assuming there's only one video
    // first convert to object URL (data parsed is raw file)
    if(playerSource == null && fileUploads.length != 0) {
      const url = URL.createObjectURL(fileUploads[0])
      videoContainerRef.current.src = url
    } else {
      return
    }

  }, [fileUploads])

  const setRatio = () => {
    const vw = videoContainerRef.current.videoWidth
    const vh = videoContainerRef.current.videoHeight
    ratio.current = Math.round(vw / vh)
    console.log(ratio.current)
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
          type="video/mp4" 
          src = { playerSource } />
      </AspectRatio>
    </Container>
  )
}

export default VideoDisplay
