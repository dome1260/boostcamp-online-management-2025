<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/user';
import { useNotificationStore } from '../../../stores/notification';
import axios from 'axios';

import ConsentDelete from '../../../components/ConsentDelete.vue';

const userStore = useUserStore()
const notificationStore = useNotificationStore()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const productInfo = ref({
  name: '',
  price: 0,
  image: '',
  category: null,
  tags: [],
  status: 'ACTIVE'
})

const userAccessToken = computed(() => userStore.userAccessToken)

const getProductById = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    productInfo.value = response.data.data
  } catch (error) {
    console.error('[ERROR] product - get product by id', error?.message || error)
  } finally {
    loading.value = false
  }
}

const deleteProduct = async () => {
  loading.value = true
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    router.back()
    notificationStore.showMessage('Delete product successfully')
  } catch (error) {
    console.error('[ERROR] product - delete product by id :', error?.message || error)
    notificationStore.showMessage(error?.message || error, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getProductById()
})
</script>

<template>
  <v-container class="pa-4">
    <div class="d-flex align-center ga-2 mb-4">
      <v-btn
        variant="text"
        @click="router.back()">
        <v-icon start> mdi-chevron-left </v-icon>
        Back
      </v-btn>
      <v-spacer />
      <v-btn
        :to="{ name: 'ProductEdit', params: { id: route.params.id } }"
        variant="flat"
        color="warning">
        <v-icon start> mdi-square-edit-outline </v-icon>
        Edit Product
      </v-btn>
      <ConsentDelete @confirm="deleteProduct()">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="flat"
            color="red">
            Delete
          </v-btn>
        </template>
      </ConsentDelete>
    </div>
    <v-card
      :loading="loading"
      variant="outlined"
      class="pa-4">
      <v-row>
        <v-col cols="12">
          Status: {{ productInfo.status }}
        </v-col>
        <v-col cols="12">
          Name: {{ productInfo.name }}
        </v-col>
        <v-col cols="12">
          Price: {{
            productInfo.price.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0 
            })
          }}
        </v-col>
        <v-col cols="12">
          Category: {{ productInfo?.category?.name || '-' }}
        </v-col>
        <v-col cols="12">
          <div class="d-flex flex-wrap ga-2">
            Tags:
            <v-chip
              v-for="(tag, i) in productInfo.tags"
              :key="i"
              color="primary">
              {{ tag.name }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>