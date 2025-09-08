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
    <h1> Shipping Info </h1>
    <v-row class="my-0">
      <v-col cols="12">
        {{ props.customer.address }} {{ props.customer.zipcode }}
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>