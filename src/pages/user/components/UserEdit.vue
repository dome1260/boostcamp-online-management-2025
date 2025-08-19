<script setup>
import { computed, ref, watch } from 'vue';
import { useUserStore } from '../../../stores/user';
import axios from 'axios';

import UserForm from './UserForm.vue';

const userStore = useUserStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['refetch']);

const dialog = ref(false)
const loading = ref(false)
const form = ref({
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  role: ''
})

const userAccessToken = computed(() => userStore.userAccessToken)

const close = () => {
  dialog.value = false
}

const updateForm = (_event) => {
  form.value[_event.name] = _event.value
}

const updateUser = async () => {
  loading.value = true
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/users/${props.id}`, form.value, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    emit('refetch')
    close()
  } catch (error) {
    console.error('[ERROR] update user:', error?.message || error);
  } finally {
    loading.value = false
  }
}

const getUserById = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${props.id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    form.value = response.data.data
  } catch (error) {
    console.error('[ERROR] get user by id', error?.message || error)
  } finally {
    loading.value = false
  }
}

watch(dialog, (newValue) => {
  if (newValue) {
    getUserById()
  }
})
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="600">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        color="warning"
        variant=flat
        size="36">
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
    </template>
    <v-card
      :loading="loading"
      class="pa-4">
      <h1 class="mb-4"> Edit User </h1>
      <UserForm
        :form="form"
        edit-mode
        @close="close()"
        @update:form="updateForm"
        @submit="updateUser()" />
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
