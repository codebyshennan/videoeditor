import { Slider, SliderFilledTrack, SliderTrack, SliderThumb, Icon } from "@chakra-ui/react"
import { Box, Flex, Container, Stack, Button } from "@chakra-ui/react"
import DisplayHelp from "../video/DisplayHelp"
import { FaPlay, FaCut, FaPause, FaFastBackward, FaFastForward, FaInfoCircle } from 'react-icons/fa'
import { useState } from 'react'
import { MdOutlinePanTool } from "react-icons/md"
import { SiSpeedtest } from 'react-icons/si'
import { useDisclosure } from "@chakra-ui/react"

const PlayerControls = () => {

    const [ playing, setPlaying ] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Stack
      direction="row"
      h="50px"
      alignItems="center"
      justifyContent="center"
      spacing={4}
    >
      <Button variant="outline" leftIcon={<Icon as={SiSpeedtest} />}>
        2x
      </Button>
      <Stack
        direction="row"
      >
        <Button leftIcon={<Icon as={FaCut}/>} variant="outline">
          Slice
        </Button>
        <Button leftIcon={<Icon as={MdOutlinePanTool} />} variant="outline">
          Pan
        </Button>
      </Stack>
      <Stack
        direction="row"
      >
        <Flex
          justifyContent="space-between"
        >
          <Button leftIcon={<Icon as={FaFastBackward}/> } variant="outline"> </Button>

          { playing ? 
            <Button
              leftIcon={<Icon as={FaPause} /> }
              onClick={ ()=> {setPlaying(false)} }
              variant="outline"
            /> :
            <Button 
              leftIcon={<Icon as={FaPlay} /> }
              onClick={ ()=> { setPlaying(true)} }
              variant="outline"
            /> 
          }

          <Button leftIcon={<Icon as={FaFastForward} /> } variant="outline"></Button>
        </Flex>
      </Stack>
      <Container
        textAlign="right"
      >
        <Button leftIcon={<Icon as={FaInfoCircle} onClick={onOpen}/>} variant="outline"> </Button>
        <DisplayHelp isOpen={isOpen} onClose={onClose} />
      </Container>
    </Stack>
  )
}

export default PlayerControls
