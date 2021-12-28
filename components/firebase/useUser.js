import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from './init'
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie
} from './userCookies'
import mapUserData from './mapUserData'


initFirebase()

const useUser = () => {

  const [user, setUser ] = useState()
  const router = useRouter()

  const logout = async ()=> {
    return firebase
            .auth()
            .signOut()
            .then( ()=> {
              router.push('/login')
            })
            .catch(e => {
              console.error(e)
            })
  }

  useEffect(()=> {
    // firebase updaters the id token every hour, this makes sure that state and cookie are both kept up to date

    const cancelAuthListener = firebase.auth().onIdTokenChanged(user => {
      if(user) {
        const userData = mapUserData(user)
        setUserCookie(userData)
      } else {
        removeUserCookie()
        setUser()
      }
    })

    const userFromCookie = getUserFromCookei()
    if(!userFromCookie) {
      router.push('/')
      return
    }

    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
  }, [])

  return { user, logout }

}

export default useUser