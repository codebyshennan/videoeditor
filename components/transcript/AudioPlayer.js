import { Slider, SliderFilledTrack, SliderTrack, SliderThumb, Icon } from "@chakra-ui/react"
import { Box, Flex, Container } from "@chakra-ui/react"
import { FaPlay, FaPause, FaFastBackward, FaFastForward } from 'react-icons/fa'
import { useState } from 'react'

const AudioPlayer = () => {
  const [ playing, setPlaying ] = useState(false)


  return (
    <Box w="100%">
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
      <Flex>
        <Container>
          2x
        </Container>
        <Container>
          <Flex
            justifyContent="space-between"
          >
            <Icon as={FaFastBackward} />
            { playing ? <Icon as={FaPause} onClick={ ()=> {setPlaying(false)} }/> :<Icon as={FaPlay} onClick={ ()=> { setPlaying(true)} }/> }
            <Icon as={FaFastForward} />
          </Flex>
        </Container>
        <Container
          textAlign="right"
        >
          info
        </Container>
      </Flex>
    </Box>
  )
}


export default AudioPlayer
