import initFirebase from "./init";
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
import firebase from 'firebase/app'
import { setUserCookie } from './userCookies'
import { mapUserData } from './mapUserData' 

initFirebase()

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = mapUserData(user)
      setUserCookie(userData)
    }
  }
}

const FirebaseAuth = () => {
  const [ renderAuth, setRenderAuth ] = useState(false)
  useEffect(()=> {
    if( typeof window != undefined) {
      setRenderAuth(true)
    }
  }, [])

  return (
    <>
      { renderAuth ? 
          <StyledFirebaseAuth 
            uiConfig = { firebaseAuthConfig }
            firebaseAuth = { firebase.auth() }
          /> : null
      }
    </>
  )
}

export default FirebaseAuth