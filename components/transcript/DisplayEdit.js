import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, Stack, InputGroup, InputLeftElement, Input, Icon, Textarea
} from '@chakra-ui/react'

import { CgCompress } from 'react-icons/cg'
import { GiSilenced } from 'react-icons/gi'

const DisplayEdit = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transcript</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea placeholder='Here is a sample placeholder' />
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

export default DisplayEdit
