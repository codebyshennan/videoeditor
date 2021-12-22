import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, Stack, InputGroup, InputLeftElement, Input, Icon
} from '@chakra-ui/react'

import { CgCompress } from 'react-icons/cg'
import { GiSilenced } from 'react-icons/gi'

const DisplayOptions = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transcription Options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<Icon as={GiSilenced} color='gray.300' />}
              />
              <Input type='time' placeholder='Silence Threshold' />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children={<Icon as={CgCompress} />}
              />
              <Input type="time" placeholder='Compressed Silence Duration' />
            </InputGroup>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DisplayOptions
