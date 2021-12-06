import { Box, Flex, Slider, SliderTrack, SliderFilledTrack, Container, SliderThumb } from '@chakra-ui/react'



const VideoPlayer = () => {
  return (
    <Box>
    <Flex
        justifyContent="space-between"
      >
        <Container>
          00:00
        </Container>
        <Container
          textAlign="right"
        >
          10:52
        </Container>
      </Flex>
      <Slider aria-label={['min', 'max']} defaultValue={[30, 80]}>
        <SliderTrack bg='red.100'>
          <SliderFilledTrack bg='tomato' />
        </SliderTrack>
        <SliderThumb boxSize={6} index={0}>
          {/* <Box color='tomato' as={MdGraphicEq} /> */}
        </SliderThumb>
      </Slider>
    </Box>
  )
}

export default VideoPlayer
