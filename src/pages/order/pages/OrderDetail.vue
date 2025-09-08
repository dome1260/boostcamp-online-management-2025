<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/user';
import { useNotificationStore } from '../../../stores/notification';
import axios from 'axios';

import ConsentConfirm from '../../../components/ConsentConfirm.vue';
import OrderInfo from '../components/details/OrderInfo.vue';
import CustomerInfo from '../components/details/CustomerInfo.vue';
import ShippingInfo from '../components/details/ShippingInfo.vue';
import ProductInfo from '../components/details/ProductInfo.vue';
import ChangeStatusBtn from '../components/ChangeStatusBtn.vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const notificationStore = useNotificationStore()

const loading = ref(false)
const orderInfo = ref({
  orderNo: '',
  createdAt: null,
  totalAmount: 0,
  status: 'PENDING',
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
const isChangeStatus = computed(() => orderInfo.value.status !== 'FINISHED' && orderInfo.value.status !== 'CANCELLED')

const getOrderById = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    orderInfo.value = response.data.data
  } catch (error) {
    console.error('[ERROR] order - get order by id :', error?.message || error)
    notificationStore.showMessage(error?.message || error, 'error')
  } finally {
    loading.value = false
  }
}

const UpdateOrderStatus = async (newStatus) => {
  loading.value = true
  try {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/orders/${route.params.id}/order-status`,
      {
        status: newStatus
      },
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.value}`
        }
      }
    )
    notificationStore.showMessage('Update order status successfully', 'success')
    getOrderById()
  } catch (error) {
    console.error('[ERROR] order - update order status :', error?.message || error)
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
  <v-container class="pa-4">
    <div class="d-flex align-center flex-wrap ga-2 mb-4">
      <v-btn
        variant="text"
        @click="router.back()">
        <v-icon start> mdi-chevron-left </v-icon>
        Back
      </v-btn>
      <v-spacer />
      <ChangeStatusBtn
        v-if="isChangeStatus"
        :status="orderInfo.status"
        @update:status="UpdateOrderStatus" />
      <v-btn
        v-if="isChangeStatus"
        :to="{ name: 'OrderEdit', params: { id: route.params.id } }"
        :disabled="loading"
        variant="flat"
        color="warning">
        <v-icon start> mdi-square-edit-outline </v-icon>
        Edit Order
      </v-btn>
      <ConsentConfirm
        v-if="isChangeStatus"
        @confirm="UpdateOrderStatus('CANCELLED')">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="outlined"
            color="grey">
            Cancel Order
          </v-btn>
        </template>
      </ConsentConfirm>
    </div>
    <v-card
      :loading="loading"
      variant="flat"
      class="pa-4">
      <v-row class="mt-0 mb-3">
        <v-col
          cols="12"
          lg="5">
          <OrderInfo :order="orderInfo" />
        </v-col>
        <v-col
          cols="12"
          lg="5">
          <CustomerInfo :customer="orderInfo.customer" />
        </v-col>
        <v-col cols="12">
          <ShippingInfo :customer="orderInfo.customer" />
        </v-col>
      </v-row>
      <ProductInfo :order="orderInfo" />
    </v-card>
  </v-container>
</template>

<style scoped>
</style>