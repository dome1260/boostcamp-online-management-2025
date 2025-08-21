<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const menu = ref(false)

const handleLogout = () => {
  userStore.clearUser()
  router.push({ name: 'LoginPage' })
}
</script>

<template>
  <v-app-bar>
    <v-container class="d-flex justify-space-between align-center">
      <v-app-bar-title>
        Title Brand
      </v-app-bar-title>
      <v-menu
        v-model="menu"
        width="150">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="flat"
            icon>
            <v-icon>
              {{ menu ? 'mdi-chevron-up' : ' mdi-chevron-down' }}
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleLogout()">
            Logout
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
</style>
