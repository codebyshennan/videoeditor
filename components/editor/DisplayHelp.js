import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, Kbd
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react"


const DisplayHelp = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keyboard Helpers</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Kbd>shift</Kbd> + <Kbd> drag </Kbd>
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

export default DisplayHelp
