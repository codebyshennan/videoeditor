import { Slider, SliderFilledTrack, SliderTrack, SliderThumb, Icon } from "@chakra-ui/react"
import { Box, Flex, Container } from "@chakra-ui/react"
import { FaPlay, FaPause, FaFastBackward, FaFastForward } from 'react-icons/fa'
import { useState } from 'react'

const PlayerControls = () => {

    const [ playing, setPlaying ] = useState(false)

  return (
    <Box w="100%">
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

export default PlayerControls
