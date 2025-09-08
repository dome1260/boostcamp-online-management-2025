<script setup>
const props = defineProps({
  customer: {
    Type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div>
    <h1> Customer Info </h1>
    <v-row class="my-0">
      <v-col cols="12">
        Name: {{ props.customer.firstName }} {{ props.customer.lastName }}
      </v-col>
      <v-col cols="12">
        Email: {{ props.customer.email }}
      </v-col>
      <v-col cols="12">
        Phone Number: {{ props.customer.phoneNumber }}
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>