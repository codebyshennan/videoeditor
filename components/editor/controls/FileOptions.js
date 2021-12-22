import { AppContext } from "../../../pages/main"
import { useContext } from "react"
import { Icon, Flex, Button } from '@chakra-ui/react'
import { FaAudioDescription, FaFileAudio, FaFileWord, FaLongArrowAltUp } from "react-icons/fa"
import { CgOptions } from 'react-icons/cg'
import DisplayOptions from './DisplayOptions'
import { useDisclosure } from '@chakra-ui/react'

const FileOptions = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Button leftIcon={ <Icon as={FaAudioDescription} /> } variant={"outline"}>
        Extract Audio
      </Button>
      <Button leftIcon={ <Icon as={FaFileWord} /> } variant={"outline"}>
        Transcribe
      </Button>
      <Button leftIcon={ <Icon as={FaLongArrowAltUp} /> } variant={"outline"}>
        Optimize
      </Button>
      <Button leftIcon={ <Icon as={CgOptions} /> } variant={"outline"} onClick={onOpen}>
        Options
      </Button>
      <DisplayOptions isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default FileOptions
