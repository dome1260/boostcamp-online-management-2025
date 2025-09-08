<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotificationStore } from '../../../stores/notification';
import { useUserStore } from '../../../stores/user';
import axios from 'axios';

import OrderForm from '../components/OrderForm.vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const notificationStore = useNotificationStore()

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

const getOrderById = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    form.orderNo = response.data.data.orderNo
    form.customer = response.data.data.customer
    form.orderItems = response.data.data.orderItems
  } catch (error) {
    console.error('[ERROR] order - get order by id :', error?.message || error)
    notificationStore.showMessage(error?.message || error, 'error')
  } finally {
    loading.value = false
  }
}

const updateOrder = async () => {
  loading.value = true
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/orders/${route.params.id}`,
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
      notificationStore.showMessage('Update order successfully')
    }, 200)
  } catch (error) {
    console.error('[ERROR] order - update order :', error?.message || error)
    notificationStore.showMessage(error?.message || error, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getOrderById()
})
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
        edit-mode
        @submit="updateOrder()"
        @cancel="router.back()" />
    </v-card>
  </v-container>
</template>

<style scoped>
</style>