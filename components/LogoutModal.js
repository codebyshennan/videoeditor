import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, Link
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { CgCompress } from 'react-icons/cg'
import { GiSilenced } from 'react-icons/gi'

const LogoutModal = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transcription Options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to logout?

          <NextLink href="/main/logout" passHref>
            <Link>
              <Button>
                Logout
              </Button>
            </Link>
          </NextLink>

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

export default LogoutModal
