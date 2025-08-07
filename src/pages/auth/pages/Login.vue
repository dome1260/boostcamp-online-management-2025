<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const login = () => {
  router.push({ name: 'UserPage' })
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
              id="login-password-input"
              density="compact"
              variant="outlined"
              type="password" />
          </v-col>
        </v-row>
        <v-btn
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
