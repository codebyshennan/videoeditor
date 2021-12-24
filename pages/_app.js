// import { ApolloProvider } from '@apollo/client'
// import { useApollo } from '../../apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { UserContext, ffmpegContext } from '../components/context'
import { useUserData } from '../components/hooks'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Theme from './theme'

const ffmpeg = createFFmpeg({
  corePath: '/ffmpeg-core/ffmpeg-core.js',
  // log: true,
  // logger: ({message})=> console.log(message),
  // progress: (p) => console.log(p)
});

const App = ({ Component, pageProps }) => {
  // const apolloClient = useApollo(pageProps.initialApolloState)
  const userData = useUserData()
  console.log('userData >> ', userData)

  return (
    // <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={Theme}>
        <ffmpegContext.Provider value={ffmpeg} >
          <UserContext.Provider value={userData} >
            <DndProvider backend={ HTML5Backend }>
              <Component {...pageProps} />
            </DndProvider>
          </UserContext.Provider>
        </ffmpegContext.Provider>
      </ChakraProvider>
    // </ApolloProvider>
  )
}

export default App

