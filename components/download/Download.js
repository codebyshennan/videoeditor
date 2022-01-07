import { Flex, Container } from '@chakra-ui/react';
import Optimized from './Optimized';
import Original from './Original';
import TranscriptStatusBar from './TranscriptStatusBar';
import ProcessingControls from './ProcessingControls'
import ProgressBar from '../editor/controls/ProgressBar';
import { useEffect, useContext } from 'react'


const Download = () => {

  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        h={{ base: 'auto', md: '90vh' }}
        py={[0, 10, 20]}
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        <Original />
        <Optimized />
        <TranscriptStatusBar />
        <ProcessingControls />
        <ProgressBar />
      </Flex>
    </Container>
  )
};

export default Download;