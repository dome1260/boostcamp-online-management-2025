<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import CategoryCreate from './components/CategoryCreate.vue';
import CategoryEdit from './components/CategoryEdit.vue';
import { useUserStore } from '../../stores/user';
import axios from 'axios';

import ConsentDelete from '../../components/ConsentDelete.vue'

const userStore = useUserStore()

const headers = [
  {
    title: 'Name',
    value: 'name'
  },
  {
    title: 'Status',
    value: 'status'
  },
  {
    title: '',
    value: 'actions'
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

const getCategoryByPaginate = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    items.value = response.data.data.docs
    filter.totalPages = response.data.data.totalPages
  } catch (error) {
    console.error('[ERROR] category - get category by paginate', error?.message || error)
  } finally {
    loading.value = false
  }
}

const deleteCategory = async (id) => {
  loading.value = true
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    getCategoryByPaginate()
  } catch (error) {
    console.error('[ERROR] category - delete category', error?.message || error)
  } finally {
    loading.value = false
  }
}

const handleChangePage = () => {
  getCategoryByPaginate()
}

onMounted(() => {
  getCategoryByPaginate()
})
</script>

<template>
  <v-container>
    <div class="d-flex align-center gap-2">
      <v-spacer />
      <CategoryCreate @refetch="getCategoryByPaginate()" />
    </div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="-1">
      <template #[`item.actions`]="{ item }">
        <div class="d-flex ga-2">
          <CategoryEdit
            :id="item._id"
            @refetch="getCategoryByPaginate()" />
          <ConsentDelete @confirm="deleteCategory(item._id)" />
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
  </v-container>
</template>

<style scoped>
</style>
