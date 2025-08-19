<script setup>
import { ref } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:form',
  'submit',
  'close'
])

const userForm = ref(null)
const roleItems = [
  {
    title: 'Admin',
    value: 'ADMIN'
  },
  {
    title: 'Sales',
    value: 'SALES'
  }
]

const requiredRule = (value) => {
  return !!value || 'This field is required'
}

const updateValue = (name, value) => {
  emit('update:form', { name, value })
}

const onCancel = () => {
  emit('close')
}

const onSubmit = async () => {
  const { valid } = await userForm.value.validate()
  if (valid) {
    emit('submit')
  }
}
</script>

<template>
  <v-form
    ref="userForm"
    @submit.prevent="onSubmit()">
    <v-row class="my-1">
      <v-col
        v-if="!props.editMode"
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-username">
          Username
          <span class="text-red"> * </span>
        </label>
        <v-text-field
          :model-value="form.username"
          :rules="[
            requiredRule
          ]"
          id="user-username"
          density="compact"
          variant="outlined"
          required
          @update:model-value="updateValue('username', $event)" />
      </v-col>
      <v-col
        v-if="!props.editMode"
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-password">
          password
          <span class="text-red"> * </span>
        </label>
        <v-text-field
          :model-value="form.password"
          :rules="[
            requiredRule
          ]"
          id="user-password"
          density="compact"
          variant="outlined"
          type="password"
          required
          @update:model-value="updateValue('password', $event)" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-first-name">
          First Name
          <span class="text-red"> * </span>
        </label>
        <v-text-field
          :model-value="form.firstName"
          :rules="[
            requiredRule
          ]"
          id="user-first-name"
          density="compact"
          variant="outlined"
          required
          @update:model-value="updateValue('firstName', $event)" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-last-name">
          Last Name
          <span class="text-red"> * </span>
        </label>
        <v-text-field
          :model-value="form.lastName"
          :rules="[
            requiredRule
          ]"
          id="user-last-name"
          density="compact"
          variant="outlined"
          required
          @update:model-value="updateValue('lastName', $event)" />
      </v-col>
      <v-col
        cols="12"
        class="py-1">
        <label for="user-email">
          Email
          <span class="text-red"> * </span>
        </label>
        <v-text-field
          :model-value="form.email"
          :rules="[
            requiredRule
          ]"
          id="user-email"
          density="compact"
          variant="outlined"
          required
          @update:model-value="updateValue('email', $event)" />
      </v-col>
      <v-col
        cols="12"
        class="py-1">
        <label for="user-role">
          Role
          <span class="text-red"> * </span>
        </label>
        <v-autocomplete
          :model-value="form.role"
          :rules="[
            requiredRule
          ]"
          id="user-role"
          density="compact"
          variant="outlined"
          :items="roleItems"
          item-title="title"
          item-value="value"
          required
          @update:model-value="updateValue('role', $event)" />
      </v-col>
    </v-row>
    <div class="d-flex align-center ga-4">
      <v-btn
        type="submit"
        color="primary"
        variant="flat">
        Save
      </v-btn>
      <v-btn
        color="grey"
        variant="flat"
        @click="onCancel()">
        Cancel
      </v-btn>
    </div>
  </v-form>
</template>

<style scoped>
</style>
