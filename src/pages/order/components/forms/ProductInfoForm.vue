<script setup>
import SelectProduct from './SelectProduct.vue'
import QtyInput from '../QtyInput.vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  totalAmount: {
    type: Number,
    default: 0
  }
})

const headers = [
  // {
  //   title: 'รูป',
  //   value: 'image',
  //   nowrap: true
  // },
  {
    title: 'Name',
    value: 'name',
    nowrap: true,
  },
  {
    title: 'Quantity',
    value: 'qty',
    align: 'end',
    nowrap: true
  },
  {
    title: 'Unit Price',
    value: 'price',
    align: 'end'
  },
  {
    title: 'Total Price',
    value: 'totalPrice',
    align: 'end',
    nowrap: true
  }
]

const calculateItemTotalPrice = (item) => {
  let totalPrice = 0
  totalPrice = item.product.price
  totalPrice = totalPrice * Number(item.quantity)
  item.totalPrice = totalPrice >= 0 ? totalPrice : 0
}

</script>

<template>
  <div class="d-flex flex-column ga-6">
    <div class="d-flex justify-space-between align-center ga-2">
      <h1 class="text-h5 text-black-1">
        Product List
      </h1>
      <SelectProduct
        :form="props.form"
        @update:form="emit('update:value', $event)" />
    </div>
    <v-data-table
      :headers="headers"
      :items="props.form.orderItems"
      :items-per-page="-1"
      disable-sort>
      <template #item="{ item }">
        <tr>
          <!-- <td class="text-no-wrap">
            <img
              v-if="item.product.images.length && item.product.images[0]"
              :src="item.product.images[0]"
              class="my-1"
              height="48">
          </td> -->
          <td class="text-truncate">
            {{ item.product.name }}
          </td>
          <td class="text-no-wrap text-right">
            {{ 
              item.product.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </td>
          <td>
            <div class="d-flex justify-end">
              <QtyInput
                v-model="item.quantity"
                @update:model-value="calculateItemTotalPrice(item)" />
            </div>
          </td>
          <td class="text-no-wrap text-right">
            {{
              item.totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </td>
        </tr>
      </template>
      <template #bottom />
    </v-data-table>
    <div class="d-flex justify-end text-h6">
      <span class="mr-4"> Total Amount: </span>
      {{ 
        props.totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) 
      }}
    </div>
  </div>
</template>
