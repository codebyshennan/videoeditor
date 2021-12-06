import { AspectRatio } from '@chakra-ui/react'

const VideoDisplay = () => {
  return (
    // This video will have equal sides
    <AspectRatio width='70vw' ratio={16/9}>
      <iframe
        title='naruto'
        src='https://www.youtube.com/embed/QhBnZ6NPOY0'
        allowFullScreen
      />
    </AspectRatio>
  )
}

export default VideoDisplay
