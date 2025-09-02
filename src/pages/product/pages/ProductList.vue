<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useUserStore } from '../../../stores/user';
import { useRouter } from 'vue-router';
import axios from 'axios';

const userStore = useUserStore()
const router = useRouter()

const headers = []
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
    // 
  } catch (error) {
    console.error('[ERROR] product - get product by paginate', error?.message || error)
  } finally {
    loading.value = false
  }
}

const handleChangePage = () => {
  getProductByPaginate()
}

onMounted(() => {
  // getProductByPaginate()
})
</script>

<template>
  <v-container>
    <div class="d-flex align-center gap-2">
      <h1> Product </h1>
      <v-spacer />
    </div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="-1">
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
