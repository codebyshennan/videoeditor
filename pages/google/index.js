
import { gql, useQuery } from '@apollo/client'
import speech from '@google-cloud/speech'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

// creates a new client
const client = new speech.SpeechClient()

const Index = ({ data }) => {

  console.log(data)

  return <p>Loading...</p>
}

export const getServerSideProps = async() => {

  const quickstart = async() => {

    // the path to the remote LINEAR16 file
    const gcsUri = 'gs://audio_trnscrptn/shennan_video.flac';

    // the audio file's encoding, sample rate in Hz, and BCP-47 language code
    const audio = {
      uri: gcsUri,
    }

    const config = {
      encoding: 'FLAC',
      sampleRateHertz: 32000,
      languageCode: 'en-US',
      model: 'video',
      enableAutomaticPunctuation: true,
      enableWordTimeOffsets: true,
      enableWordConfidence: true,
      profanityFilter: true,
      useEnhanced: true
    }

    const request = {
      audio: audio,
      config: config,
    }


    // FOR ASYNCHRONOUS CALLS
    // // detects speech in the audio file. this creates a recognition job that you can wait for now, or get its result later.
    // const [ operation ] = await client.longRunningRecognize(request)

    // // gert a Promise representation of the final job result
    // const [ response ] = await operation.promise()
    // const transcription = response.results.map( result => result.alternatives[0].transcript).join('\n')

    // FOR SYNCHRONOUS CALLS
    const [response] = await client.recognize(request);
    console.log(response.results)
    const transcription = response.results
    .map(result => result.alternatives[0])
    
    return transcription
  }

  const data = await quickstart()

  return {
    props: {
      data
    }
  }
}



export default Index



