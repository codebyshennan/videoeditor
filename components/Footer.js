import React from 'react'
import Image from 'next/image'
import { Flex, Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex
      flex="1"
      padding="1rem 0"
      borderTop="1px solid #eaeaea"
      justifyContent="center"
      alignItems="center"
    >
      Powered by En & Sn
      <Box
        height="1em"
        marginLeft = "0.5em"
      >
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </Box>
    </Flex>
  )
}

export default Footer
