<template>
  <div>
    <p><NuxtLink to="/secret">Go to Secret Page</NuxtLink></p>
    <button v-if="firebaseUser" class="button" @click="signOut">Sign out</button>
    <div v-if="firebaseUser">
      <client-only>
        <pre>{{ firebaseUser }}</pre>
      </client-only>
    </div>
    <div v-else>User is signed out</div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const firebaseUser = userStore.firebaseUser

const signOut = async () => {
  await signOutUser()
}
</script>

<style></style>
