<script setup>
const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'update:form',
  'submit',
  'close'
])

const updateValue = (name, value) => {
  emit('update:form', { name, value })
}

const handleCancel = () => {
  emit('close')
}

const handleSave = () => {
  emit('submit')
}
</script>

<template>
  <v-form @submit.prevent="handleSave()">
    <v-row>
      <v-col
        cols="12"
        class="py-1">
        <label for="user-form-name"> Name </label>
        <v-text-field
          id="user-form-name"
          :model-value="props.form.name"
          density="compact"
          variant="outlined"
          @update:model-value="updateValue('name', $event)" />
      </v-col>
    </v-row>
    <div class="d-flex ga-4">
      <v-btn
        type="submit"
        color="primary"
        variant="flat">
        Save
      </v-btn>
      <v-btn
        color="grey"
        variant="flat"
        @click="handleCancel()">
        Cancel
      </v-btn>
    </div>
  </v-form>
</template>

<style scoped>
</style>
