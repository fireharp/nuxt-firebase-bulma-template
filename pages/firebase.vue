<template>
  <div>
    <section class="hero is-grey is-fullheight is-justify-content-flex-start">
      <div class="has-text-centered mt-6">
        <p class="title">Firebase/Nuxt3 Auth</p>
        <p class="subtitle">https://nuxt3-firebase-razorcx.netlify.app/</p>
      </div>

      <div class="section">
        <div class="columns">
          <div class="column is-4 is-offset-2">
            <AuthFirebase class="box px-5 py-5 mx-4" title="Register" :form="registerForm" :message="registerMessage" @submit="register" />
            <AuthFirebase class="box px-5 py-5 mx-4" title="Sign in" :form="signinForm" @submit="signin" />
          </div>
          <div v-if="firebaseUser" class="column is-4">
            <p class="subtitle">Firebase Auth Current User</p>
            <pre>{{ firebaseUser }}</pre>
            <button class="button mt-4" @click="signOutUser">Sign Out</button>
          </div>
          <div v-else class="column is-4 has-text-centered">
            <p>User is signed out</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { signOutUser } from '@/composables/useFirebase'

const registerForm = ref({ email: '', password: '' })
const signinForm = ref({ email: '', password: '' })
const userStore = useUserStore()
const firebaseUser = userStore.firebaseUser
const registerMessage = ref()

const signin = () => {
  console.log(signinForm.value)
  signInUser(signinForm.value.email, signinForm.value.password)
  signinForm.value = { email: '', password: '' }
}

const register = async () => {
  console.log(registerForm.value)
  const credentials = await createUser(registerForm.value.email, registerForm.value.password)
  registerForm.value = { email: '', password: '' }

  if (credentials) {
    registerMessage.value = `Successfully registered: ${credentials.user.email}`
    setTimeout(() => {
      registerMessage.value = ''
    }, 3000)
  }
}
</script>

<style></style>
