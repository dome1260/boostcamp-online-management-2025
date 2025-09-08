<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '../../../stores/notification';
import { useUserStore } from '../../../stores/user';
import axios from 'axios';

import OrderForm from '../components/OrderForm.vue';

const router = useRouter()
const notificationStore = useNotificationStore()
const userStore = useUserStore()

const loading = ref(false)
const form = reactive({
  orderNo: '',
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    zipcode: ''
  },
  orderItems: []
})

const userAccessToken = computed(() => userStore.userAccessToken)

const totalAmount = computed(() => {
  return form.orderItems.reduce((acc, current) => acc += current.totalPrice, 0)
})

const createOrder = async () => {
  loading.value = true
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/orders`,
      {
        ...form,
        totalAmount: totalAmount.value,
        orderItems: form.orderItems.map(orderItem => ({
          ...orderItem,
          product: orderItem.product._id
        }))
      },
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.value}`
        }
      }
    )
    router.back()
    setTimeout(() => {
      notificationStore.showMessage('Create order successfully')
    }, 200)
  } catch (error) {
    console.error('[ERROR] order - create order :', error?.message || error)
    notificationStore.showMessage(error?.message || error, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container>
    <div class="d-flex align-center ga-2 mb-4">
      <v-btn
        variant="text"
        @click="router.back()">
        <v-icon start> mdi-chevron-left </v-icon>
        Back
      </v-btn>
    </div>
    <v-card
      :loading="loading"
      variant="flat"
      class="pa-4">
      <OrderForm
        :form="form"
        :total-amount="totalAmount"
        @submit="createOrder()"
        @cancel="router.back()" />
    </v-card>
  </v-container>
</template>

<style scoped>
</style>