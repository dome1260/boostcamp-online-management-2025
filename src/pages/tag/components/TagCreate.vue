<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../../../stores/user';
import axios from 'axios';

import TagForm from './TagForm.vue';

const userStore = useUserStore();

const emit = defineEmits(['refetch']);

const loading = ref(false)
const dialog = ref(false)
const form = ref({
  name: ''
})

const userAccessToken = computed(() => userStore.userAccessToken)

const close = () => {
  form.value.name = ''
  dialog.value = false
}

const updateForm = (_event) => {
  form.value[_event.name] = _event.value
}

const createTag = async () => {
  loading.value = true
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/tags`, form.value, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    emit('refetch')
    close()
  } catch (error) {
    console.error('[ERROR] tag - create tag:', error?.message || error);
  } finally {
    loading.value = false
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
        variant="flat"
        color="primary">
        <v-icon> mdi-plus </v-icon>
        Create Tag
      </v-btn>
    </template>
    <v-card
      :loading="loading"
      class="pa-4">
      <h1 class="mb-4"> Create Tag </h1>
      <TagForm
        :form="form"
        @update:form="updateForm"
        @submit="createTag()"
        @close="close()" />
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
