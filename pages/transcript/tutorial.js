import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
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

const Index = () => {
  

  // const router = useRouter()
  // const { data, loading, error } = useQuery(ViewerQuery)
  // const viewer = data?.viewer
  // const shouldRedirect = !(loading || error || viewer)

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push('/signin')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [shouldRedirect])

  // if (error) {
  //   return <p>{error.message}</p>
  // }

  // if (viewer) {
  //   return (
  //     <div>
  //       You're signed in as {viewer.email} goto{' '}
  //       <Link href="/about">
  //         <a>about</a>
  //       </Link>{' '}
  //       page. or{' '}
  //       <Link href="/signout">
  //         <a>signout</a>
  //       </Link>
  //     </div>
  //   )
  // }

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

    }

    const request = {
      audio: audio,
      config: config,
    }

    // detects speech in the audio file. this creates a recognition job that you can wait for now, or get its result later.
    const [ operation ] = await client.longRunningRecognize(request)

    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    response.results.forEach(result => {
      console.log(`Transcription: ${result.alternatives[0].transcript}`);
      result.alternatives[0].words.forEach(wordInfo => {
        // NOTE: If you have a time offset exceeding 2^32 seconds, use the
        // wordInfo.{x}Time.seconds.high to calculate seconds.
        const startSecs =
          `${wordInfo.startTime.seconds}` +
          '.' +
          wordInfo.startTime.nanos / 100000000;
        const endSecs =
          `${wordInfo.endTime.seconds}` +
          '.' +
          wordInfo.endTime.nanos / 100000000;
        console.log(`Word: ${wordInfo.word}`);
        console.log(`\t ${startSecs} secs - ${endSecs} secs`);
      });
    })
  }

  quickstart()

  // return {
  //   props: {
  //     data
  //   }
  // }
}



export default Index
