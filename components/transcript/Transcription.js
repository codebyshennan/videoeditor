import { Skeleton, Flex, SkeletonCircle, SkeletonText, Box, Container } from '@chakra-ui/react'

const transcripts = ['1','2','3','4']
const renderTranscript = transcripts.map( (text, index) => {
  return (
    <Box py="4" key = {index}>
      <Flex>
        <SkeletonCircle size='10'/>
        <SkeletonText mt='3' pl='4' noOfLines={2} spacing='2' width ="20%" />
      </Flex>
      <SkeletonText mt='4' noOfLines={4} spacing='4' />
    </Box>
  )
})


const Transcription = () => {

  return (
  <Box pl='6'>
    { renderTranscript }
  </Box>
  )
}


export default Transcription


