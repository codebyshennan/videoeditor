// import { ApolloProvider } from '@apollo/client'
// import { useApollo } from '../../apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { UserContext } from '../components/context'
import { useUserData } from '../components/hooks' 
import Theme from './theme'


export default function App({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps.initialApolloState)
  const userData = useUserData()
  console.log('userData >> ', userData)

  return (
    // <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={Theme}>
        <UserContext.Provider value={userData} >
          <DndProvider backend={ HTML5Backend }>
            <Component {...pageProps} />
          </DndProvider>
        </UserContext.Provider>
      </ChakraProvider>
    // </ApolloProvider>
  )
}

