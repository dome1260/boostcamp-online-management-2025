<script setup>
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

const requiredRule = (v) => {
  return !!v || 'This field is required'
}
</script>

<template>
  <div>
    <h1> Order Info </h1>
    <v-row class="my-0">
      <v-col
        cols="12"
        lg="5"
        class="py-1">
        <label for="order-no"> Order No. </label>
        <v-text-field
          id="order-no"
          v-model="props.form.orderNo"
          :disabled="props.editMode"
          :rules="[requiredRule]"
          density="compact"
          variant="outlined" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>