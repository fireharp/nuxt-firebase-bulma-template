import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/stores/user'
import firebase from 'firebase/compat'

export const createUser = async (email: string, password: string): Promise<any> => {
  const auth = getAuth()
  const credentials = await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })
  return credentials
}

export const signInUser = async (email: string, password: string): Promise<any> => {
  const auth = getAuth()
  const credentials = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })
  return credentials
}

export const initUser = async () => {
  const auth = getAuth()
  const userStore = useUserStore()
  userStore.firebaseUser = auth.currentUser as firebase.User

  const userCookie = useCookie('userCookie')

  const router = useRouter()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userStore.isAuthenticated = true
    } else {
      //if signed out
      userStore.isAuthenticated = false
      router.push('/')
    }

    userStore.firebaseUser = user as firebase.User

    // @ts-ignore
    userCookie.value = user //ignore error because nuxt will serialize to json

    $fetch('/api/auth', {
      method: 'POST',
      body: { user },
    })
  })
}

export const signOutUser = async () => {
  const auth = getAuth()
  const result = await auth.signOut()
  return result
}
