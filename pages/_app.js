// import { ApolloProvider } from '@apollo/client'
// import { useApollo } from '../../apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    // <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <DndProvider backend={ HTML5Backend }>
          <Component {...pageProps} />
        </DndProvider>
      </ChakraProvider>
    // </ApolloProvider>
  )
}

