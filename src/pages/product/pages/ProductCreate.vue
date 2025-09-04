<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/user';
import { useNotificationStore } from '../../../stores/notification';
import axios from 'axios';

import ProductForm from '../components/ProductForm.vue';

const router = useRouter()
const userStore = useUserStore()
const notificationStore = useNotificationStore()

const loading = ref(false)
const form = reactive({
  name: '',
  price: null,
  category: '',
  tags: []
})
const tags = ref([])
const categories = ref([])

const userAccessToken = computed(() => userStore.userAccessToken)

const getTagByPaginate = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/tags?page=1&limit=999`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    tags.value = response.data.data.docs
  } catch (error) {
    console.error('[ERROR] product - get tag by paginate', error?.message || error)
    notificationStore.showMessage(error?.message || error, 'error')
  }
}

const getCategoryByPaginate = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories?page=1&limit=999`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    categories.value = response.data.data.docs
  } catch (error) {
    console.error('[ERROR] product - get category by paginate', error?.message || error)
    notificationStore.showMessage(error?.message || error, 'error')
  }
}

const createProduct = async () => {
  loading.value = true
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/products`,
      {
        name: form.name,
        price: Number(form.price),
        tags: form.tags,
        category: form.category
      },
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.value}`
        }
      }
    )
    router.back()
    notificationStore.showMessage('Create product successfully')
  } catch (error) {
    console.error('[ERROR] product - create product :', error?.message || error)
    notificationStore.showMessage(error?.message || error, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getTagByPaginate()
  getCategoryByPaginate()
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
      variant="outlined"
      class="pa-4">
      <ProductForm
        :form="form"
        :categories="categories"
        :tags="tags"
        @submit="createProduct()"
        @cancel="router.back()" />
    </v-card>
  </v-container>
</template>

<style scoped>
</style>