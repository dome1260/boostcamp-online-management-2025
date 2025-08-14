<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '../../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const form = reactive({
  username: '',
  password: ''
})

const login = async () => {
  loading.value = true
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username: form.username,
      password: form.password
    })

    userStore.setUser({
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
      expiresIn: response.data.data.expiresIn
    })

    router.push({ name: 'UserPage' })

  } catch (error) {
    console.error('[ERROR] auth login :', error?.message || error)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <v-card
      width="300"
      variant="outlined">
      <v-form
        class="pa-4"
        @submit.prevent="login()">
        <h1 class="text-center mb-4"> Login </h1>
        <v-row>
          <v-col
            cols="12"
            class="py-1">
            <label for="login-username-input">
              Username
            </label>
            <v-text-field
              v-model="form.username"
              id="login-username-input"
              density="compact"
              variant="outlined" />
          </v-col>
          <v-col
            cols="12"
            class="py-1">
            <label for="login-password-input">
              Password
            </label>
            <v-text-field
              v-model="form.password"
              id="login-password-input"
              density="compact"
              variant="outlined"
              type="password" />
          </v-col>
        </v-row>
        <v-btn
          :loading="loading"
          type="submit"
          color="primary"
          variant="flat"
          block>
          Login
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>
