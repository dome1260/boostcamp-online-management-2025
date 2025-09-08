<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useUserStore } from '../../../stores/user';
import { useRouter } from 'vue-router';
import axios from 'axios';
import dayjs from 'dayjs'

const userStore = useUserStore()
const router = useRouter()

const headers = [
  {
    title: 'Order No.',
    value: 'orderNo'
  },
  {
    title: 'Created At',
    key: 'createdAt',
    value: (item) => dayjs(item.createdAt).format('DD/MM/YY HH:mm')
  },
  {
    title: 'Customer',
    key: 'customer',
    value: (item) => `${item.customer.firstName} ${item.customer.lastName}`
  },
  {
    title: 'Total Amount',
    key: 'totalAmount',
    align: 'end',
    value: (item) => item.totalAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  },
  {
    title: 'Status',
    value: 'status'
  }
]
const items = ref([])
const loading = ref(false)
const filter = reactive({
  page: 1,
  limit: 10,
  totalPages: 1
})

const userAccessToken = computed(() => userStore.userAccessToken)

const getOrderByPaginate = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    items.value = response.data.data.docs
    filter.totalPages = response.data.data.totalPages
  } catch (error) {
    console.error('[ERROR] order - get order by paginate', error?.message || error)
  } finally {
    loading.value = false
  }
}

const handleChangePage = () => {
  getOrderByPaginate()
}

const goToDetail = (_event, { item: { _id } }) => {
  router.push({ name: 'OrderDetail', params: { id: _id } })
}

onMounted(() => {
  getOrderByPaginate()
})
</script>

<template>
  <v-container>
    <div class="d-flex align-center gap-2">
      <v-spacer />
      <v-btn
        :to="{ name: 'OrderCreate' }"
        variant="flat"
        color="primary">
        <v-icon start> mdi-plus </v-icon>
        Create Order
      </v-btn>
    </div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="-1"
      @click:row="goToDetail"
      disable-sort>
      <template #bottom>
        <div class="d-flex justify-end">
          <v-pagination
            v-model="filter.page"
            :length="filter.totalPages"
            :total-visible="5"
            @update:model-value="handleChangePage" />
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
</style>
