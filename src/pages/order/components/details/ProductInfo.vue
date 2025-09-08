<script setup>
const props = defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})

const headers = [
  {
    title: 'Product Name',
    key: 'name',
    nowrap: true,
    value: 'product.name'
  },
  {
    title: 'Unit Price',
    key: 'unitPrice',
    align: 'end',
    nowrap: true,
    value: (item) => item.product.price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  },
  {
    title: 'Quantity',
    key: 'quantity',
    align: 'end',
    nowrap: true,
    value: (item) => item.quantity.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  },
  {
    title: 'Total Price',
    key: 'totalPrice',
    align: 'end',
    nowrap: true,
    value: (item) => item.totalPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
]
</script>

<template>
  <div>
    <h1> Product info </h1>
    <v-data-table
      :headers="headers"
      :items="props.order.orderItems"
      :items-per-page="-1"
      class="mb-4"
      disable-sort>
      <template #bottom>
      </template>
    </v-data-table>
    <div class="d-flex justify-end text-h6">
      <span class="mr-4"> Total Amount: </span>
      {{ 
        props.order.totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) 
      }}
    </div>
  </div>
</template>

<style scoped>
</style>