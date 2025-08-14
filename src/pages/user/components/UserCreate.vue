<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '../../../stores/user';

import UserForm from './UserForm.vue';

const userStore = useUserStore();

const emit = defineEmits(['refetch']);

const dialog = ref(false)
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

const createUser = async () => {
  try {
    await axios.post('http://localhost:3000/users', form.value, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    emit('refetch')
    close()
  } catch (error) {
    console.error('[ERROR] create user:', error?.message || error);
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="600">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="flat">
        <v-icon start> mdi-plus </v-icon>
        Add User
      </v-btn>
    </template>
    <v-card class="pa-4">
      <h1 class="mb-4"> Add User </h1>
      <UserForm
        :form="form"
        @update:form="updateForm"
        @submit="createUser()"
        @close="close()" />
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
