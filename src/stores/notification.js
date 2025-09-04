import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notification', () => {
  const notification = ref({
    show: false,
    type: 'success',
    message: ''
  })

  const showMessage = (message, type = 'success') => {
    notification.value.show = true
    notification.value.type = type
    notification.value.message = message
  }

  return {
    notification,
    showMessage
  }
})
