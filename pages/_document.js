import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import Theme from './theme'

class Document extends NextDocument {


  render() {
    return (
      <Html>
        <Head>
          <title> SuccinctCut </title>
          <meta name="description" content="Make your videos succinct" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
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