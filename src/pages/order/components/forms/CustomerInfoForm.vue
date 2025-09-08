<script setup>
const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const requiredRule = (v) => {
  return !!v || 'This field is required'
}
</script>

<template>
  <div>
    <h1> Customer Info </h1>
    <v-row class="my-0">
      <v-col
        cols="12"
        lg="5"
        class="py-1">
        <label for="order-customer-first-name"> First Name </label>
        <v-text-field
          id="order-customer-first-name"
          v-model="props.form.customer.firstName"
          :rules="[requiredRule]"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        lg="5"
        class="py-1">
        <label for="order-customer-last-name"> Last Name </label>
        <v-text-field
          id="order-customer-last-name"
          v-model="props.form.customer.lastName"
          :rules="[requiredRule]"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        lg="5"
        class="py-1">
        <label for="order-customer-email"> Email </label>
        <v-text-field
          id="order-customer-email"
          v-model="props.form.customer.email"
          :rules="[requiredRule]"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        lg="5"
        class="py-1">
        <label for="order-customer-phone-number"> Phone Number </label>
        <v-text-field
          id="order-customer-phone-number"
          v-model="props.form.customer.phoneNumber"
          :rules="[requiredRule]"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        lg="10"
        class="py-1">
        <label for="order-customer-address"> Address </label>
        <v-textarea
          id="order-customer-address"
          v-model="props.form.customer.address"
          :rules="[requiredRule]"
          :rows="3"
          density="compact"
          variant="outlined"
          no-resize />
      </v-col>
      <v-col
        cols="12"
        lg="10"
        class="py-1">
        <label for="order-customer-zipcode"> Zipcode </label>
        <v-text-field
          id="order-customer-zipcode"
          v-model="props.form.customer.zipcode"
          :rules="[requiredRule]"
          density="compact"
          variant="outlined" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>