<script setup>
import { useNotificationStore } from '../stores/notification'
import { storeToRefs } from 'pinia'

const notificationStore = useNotificationStore()

const { notification  } = storeToRefs(notificationStore)
</script>

<template>
  <v-snackbar
    v-model="notification.show"
    :color="notification.type"
    :timeout="3000"
    :rounded="8"
    variant="elevated"
    location="top center">
    {{ notification.message }}
  </v-snackbar>
</template>