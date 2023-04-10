import { defineStore } from 'pinia'
import firebase from 'firebase/compat'

interface UserState {
  isAuthenticated: boolean
  firebaseUser: firebase.User | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: true,
    firebaseUser: null,
  }),
  persist: true,
})
