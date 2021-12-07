import { AspectRatio } from '@chakra-ui/react'

const VideoDisplay = () => {
  return (
    // This video will have equal sides
    <AspectRatio overflowY="hidden" maxHeight="50vh" ratio={1}>
      <iframe
        title='naruto'
        src='https://www.youtube.com/embed/QhBnZ6NPOY0'
        allowFullScreen
      />
    </AspectRatio>
  )
}

export default VideoDisplay
