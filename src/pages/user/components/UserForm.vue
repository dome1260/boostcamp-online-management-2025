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

const updateValue = (name, value) => {
  emit('update:form', { name, value })
}

const onCancel = () => {
  emit('close')
}

const onSubmit = () => {
  emit('submit')
}
</script>

<template>
  <v-form @submit.prevent="onSubmit()">
    <v-row>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-username"> Username </label>
        <v-text-field
          :model-value="form.username"
          id="user-username"
          density="compact"
          variant="outlined"
          @update:model-value="updateValue('username', $event)" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-password"> password </label>
        <v-text-field
          :model-value="form.password"
          id="user-password"
          density="compact"
          variant="outlined"
          type="password"
          @update:model-value="updateValue('password', $event)" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-first-name"> First Name </label>
        <v-text-field
          :model-value="form.firstName"
          id="user-first-name"
          density="compact"
          variant="outlined"
          @update:model-value="updateValue('firstName', $event)" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-last-name"> Last Name </label>
        <v-text-field
          :model-value="form.lastName"
          id="user-last-name"
          density="compact"
          variant="outlined"
          @update:model-value="updateValue('lastName', $event)" />
      </v-col>
      <v-col
        cols="12"
        class="py-1">
        <label for="user-email"> Email </label>
        <v-text-field
          :model-value="form.email"
          id="user-email"
          density="compact"
          variant="outlined"
          @update:model-value="updateValue('email', $event)" />
      </v-col>
      <v-col
        cols="12"
        class="py-1">
        <label for="user-role"> Role </label>
        <v-autocomplete
          :model-value="form.role"
          id="user-role"
          density="compact"
          variant="outlined"
          :items="roleItems"
          item-title="title"
          item-value="value"
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
