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
        icon
        color="warning"
        variant=flat
        size="36">
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
    </template>
    <v-card class="pa-4">
      <h1 class="mb-4"> Edit User </h1>
      <UserForm @close="close()" />
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
