import { extendTheme } from '@chakra-ui/react'


const config = {
  intialColorMode: 'light',
  useSystemColorMode: false,
}

// extend the theme
const Theme = extendTheme({ config })

export default Theme