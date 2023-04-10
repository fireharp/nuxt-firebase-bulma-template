<template>
  <div>
    <div v-if="!firebaseUser" class="container mt-6">
      <div class="column is-half is-offset-one-quarter">
        <AuthFirebase
          v-if="showRegisterForm"
          class="box px-5 py-5 mx-4"
          title="Register"
          :form="registerForm"
          :message="registerMessage"
          @submit="register"
        />
        <AuthFirebase v-if="!firebaseUser && !showRegisterForm" class="box px-5 py-5 mx-4" title="Sign in" :form="signinForm" @submit="signin" />
      </div>
      <div class="level">
        <div class="level-item has-text-centered">
          <button class="button" @click="showRegisterForm = !showRegisterForm">
            {{ toggleButtonText }}
          </button>
        </div>
      </div>
    </div>
    <NuxtPage v-if="firebaseUser" />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const firebaseUser = userStore.firebaseUser
const showRegisterForm = ref(false)
const registerMessage = ref()
const registerForm = ref({ email: '', password: '' })
const signinForm = ref({ email: '', password: '' })

const toggleButtonText = computed(() => {
  return showRegisterForm.value ? 'Sign in' : 'Register'
})

const signin = () => {
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

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
</style>
