// import { ApolloProvider } from '@apollo/client'
// import { useApollo } from '../../apollo/client'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    // <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    // </ApolloProvider>
  )
}

