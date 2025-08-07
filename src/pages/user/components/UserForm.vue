<script setup>
const emit = defineEmits(['close'])

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

const onCancel = () => {
  emit('close')
}
</script>

<template>
  <v-form>
    <v-row>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-username"> Username </label>
        <v-text-field
          id="user-username"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-password"> password </label>
        <v-text-field
          id="user-password"
          density="compact"
          variant="outlined"
          type="password" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-first-name"> First Name </label>
        <v-text-field
          id="user-first-name"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="user-last-name"> Last Name </label>
        <v-text-field
          id="user-last-name"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        class="py-1">
        <label for="user-email"> Email </label>
        <v-text-field
          id="user-email"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        class="py-1">
        <label for="user-role"> Role </label>
        <v-autocomplete
          id="user-role"
          density="compact"
          variant="outlined"
          :items="roleItems"
          item-title="title"
          item-value="value" />
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
