<script setup>
import dayjs from 'dayjs';

const props = defineProps({
  order: {
    Type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div>
    <h1> Order Info </h1>
    <v-row class="my-0">
      <v-col cols="12">
        Order Status: {{ props.order.status }}
      </v-col>
      <v-col cols="12">
        Order No.: {{ props.order.orderNo }}
      </v-col>
      <v-col cols="12">
        Created At: {{ dayjs(props.order.createdAt).format('DD/MM/YY HH:mm') }}
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>