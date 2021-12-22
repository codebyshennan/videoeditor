import { Slider, SliderFilledTrack, SliderTrack, SliderThumb, Icon } from "@chakra-ui/react"
import { Box, Flex, Container } from "@chakra-ui/react"
import { FaPlay, FaPause, FaFastBackward, FaFastForward } from 'react-icons/fa'
import { useState } from 'react'

const AudioPlayer = () => {
  const [ playing, setPlaying ] = useState(false)
  const [ duration, setDuration ] = useState({
    start: "00:00",
    end: "10:52"
  })

  return (
    <Box w="100%">
      <Flex
        justifyContent="space-between"
      >
        <Container>
          { duration.start }
        </Container>
        <Container
          textAlign="right"
        >
          { duration.end }
        </Container>
      </Flex>
      <Slider aria-label={['min', 'max']} defaultValue={30}>
        <SliderTrack bg='red.100'>
          <SliderFilledTrack bg='tomato' />
        </SliderTrack>
        <SliderThumb boxSize={6} index={0}>
          {/* <Box color='tomato' as={MdGraphicEq} /> */}
        </SliderThumb>
      </Slider>
      <Flex
        alignItems="center"
      >
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
