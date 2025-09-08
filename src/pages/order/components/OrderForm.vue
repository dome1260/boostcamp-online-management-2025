<script setup>
import { ref } from 'vue'

import OrderInfoForm from './forms/OrderInfoForm.vue'
import CustomerInfoForm from './forms/CustomerInfoForm.vue'
import ProductInfoForm from './forms/ProductInfoForm.vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const orderFormRef = ref(null)

const handelOnSubmit = async () => {
  const { valid } = await orderFormRef.value.validate()
  if (valid) {
    emit('submit')
  }
}

const handelOnCancel = () => {
  emit('cancel')
}
</script>

<template>
  <v-form
    ref="orderFormRef"
    @submit.prevent="handelOnSubmit()">
    <OrderInfoForm
      :form="props.form"
      :edit-mode="props.editMode" />
    <CustomerInfoForm :form="props.form" />
    <ProductInfoForm
      :form="props.form"
      :total-amount="props.totalAmount" />
    <div class="d-flex py-2 ga-2">
      <v-btn
        :disabled="!props.form.orderItems.length"
        type="submit"
        color="primary"
        variant="flat">
        Submit
      </v-btn>
      <v-btn
        variant="outlined"
        @click="handelOnCancel()">
        Cancel
      </v-btn>
    </div>
  </v-form>
</template>

<style scoped>
</style>