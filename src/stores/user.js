import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () => {
  const user = ref({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: ''
  })
  const userAuth = ref({
    accessToken: '',
    expiresIn: null
  })

  const userAccessToken = computed(() => userAuth.value.accessToken)

  const setUser = (payload) => {
    user.value = payload.user
    userAuth.value.accessToken = payload.accessToken
    userAuth.value.expiresIn = payload.expiresIn
  }

  const clearUser = () => {
    user.value = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      role: ''
    }
    userAuth.value = {
      accessToken: '',
      expiresIn: null
    }
  }

  return {
    user,
    userAuth,
    userAccessToken,
    setUser,
    clearUser
  }
}, {
  persist: {
    key: 'mgmt-user'
  }
})
