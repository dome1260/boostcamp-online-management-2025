<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const displayBreakpoint = useDisplay()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:model-value'])

const menu = ref(false)

const isMobile = computed(() => displayBreakpoint.mobile.value)

const handleLogout = () => {
  userStore.clearUser()
  router.push({ name: 'LoginPage' })
}
</script>

<template>
  <v-app-bar>
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="isMobile"
        @click="emit('update:model-value', true)" />
    </template>
    <v-container class="d-flex justify-space-between align-center">
      <v-app-bar-title class="font-weight-bold">
        {{ route.meta?.title || 'Title' }}
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
