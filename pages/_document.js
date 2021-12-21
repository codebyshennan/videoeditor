import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import Theme from './theme'

class Document extends NextDocument {


  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document