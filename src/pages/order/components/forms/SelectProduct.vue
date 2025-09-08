<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useUserStore } from '../../../../stores/user';
import axios from 'axios';

const userStore = useUserStore()

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const headers = [
  {
    title: 'Name',
    value: 'name',
    nowrap: true
  },
  {
    title: 'Category',
    key: 'category',
    nowrap: true,
    value: (item) => {
      return item.category.name
    }
  },
  {
    title: 'Tags',
    value: 'tags',
    nowrap: true
  },
  {
    title: 'Price',
    key: 'price',
    align: 'end',
    nowrap: true,
    value: (item) => item.price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  },
  {
    title: 'Status',
    value: 'status',
    nowrap: true
  }
]

const dialog = ref(false)
const items = ref([])
const loading = ref(false)
const filter = reactive({
  page: 1,
  limit: 10,
  totalPages: 1
})

const userAccessToken = computed(() => userStore.userAccessToken)

const getProductByPaginate = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    items.value = response.data.data.docs
    filter.totalPages = response.data.data.totalPages
  } catch (error) {
    console.error('[ERROR] order - get product by paginate', error?.message || error)
  } finally {
    loading.value = false
  }
}

const handleChangePage = () => {
  getProductByPaginate()
}

const isItemSelected = (item) => {
  return props.form.orderItems.some(orderItem => orderItem.product._id === item._id)
}

const handleItemSelected = (item, _event) => {
  const target = _event.target
  const value = target.checked
  const orderItems = props.form.orderItems

  if (value) {
    const foundedOrderItem = props.form.orderItems.find((orderItem) => orderItem.product._id === item._id)
    if (!foundedOrderItem) {
      orderItems.push({
        product: item,
        quantity: 1,
        totalPrice: item.price
      })
    }
  } else {
    const orderItemIndex = orderItems.findIndex(
      (orderItem) => orderItem.product._id === item._id
    )
    if (orderItemIndex > -1) {
      orderItems.splice(orderItemIndex, 1)
    }
  }
}


watch(dialog, (newValue) => {
  if (newValue) {
    getProductByPaginate()
  }
})
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="900"
    scrollable>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="success"
        variant="outlined">
        <span> Select Product </span>
        <v-icon end>
          mdi-plus-box-outline
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2> Select Product </h2>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="items"
          :items-per-page="-1"
          disable-sort
          show-select>
          <template #[`header.data-table-select`] />
          <template #[`item.data-table-select`]="{ item }">
            <v-checkbox
              :model-value="isItemSelected(item)"
              class="ml-2"
              color="primary"
              density="compact"
              hide-details
              @change="handleItemSelected(item, $event)" />
          </template>
          <template #[`item.tags`]="{ item }">
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="(tag, i) in item.tags"
                :key="i"
                color="primary">
                {{ tag.name }}
              </v-chip>
            </div>
          </template>
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
