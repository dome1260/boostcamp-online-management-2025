<script setup>
import { ref } from 'vue';

const emit = defineEmits(['confirm'])

const dialog = ref(false)

const close = () => {
  dialog.value = false
}

const handleConfirm = () => {
  emit('confirm')
  close()
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="400">
    <template #activator="{ props }">
      <slot
        name="activator"
        :props="props">
        <v-btn
          v-bind="props"
          color="primary"
          variant=flat
          size="32">
          Actions
        </v-btn>
      </slot>
    </template>
    <v-card>
      <v-card-title>
        Actions
      </v-card-title>
      <v-card-text>
        Are you sure?
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="text"
          color="grey"
          class="mr-2"
          @click=close()>
          Cancel
        </v-btn>
        <v-btn
          variant="flat"
          color="primary"
          @click="handleConfirm()">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
