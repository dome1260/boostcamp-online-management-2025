<script setup>
import { ref } from 'vue';

import UserForm from './UserForm.vue';

const dialog = ref(false)

const close = () => {
  dialog.value = false
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
      <UserForm @close="close()" />
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
