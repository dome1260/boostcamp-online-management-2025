<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import UserCreate from './components/UserCreate.vue'
import UserEdit from './components/UserEdit.vue'
import { useUserStore } from '../../stores/user'
import axios from 'axios'

import ConsentDelete from '../../components/ConsentDelete.vue'

const userStore = useUserStore()

const loading = ref(false)
const headers = [
  {
    title: 'Name',
    key: 'fullName',
    value: (item) => `${item.firstName} ${item.lastName}`
  },
  {
    title: 'Email',
    value: 'email'
  },
  {
    title: 'Role',
    value: 'role'
  },
  {
    title: '',
    value: 'actions'
  }
]
const items = ref([])
const filter = reactive({
  page: 1,
  limit: 10,
  totalPages: 1
})

const userAccessToken = computed(() => userStore.userAccessToken)

const getUsers = async () => {
  loading.value = true
  try {
    const query = new URLSearchParams({
      page: filter.page,
      limit: filter.limit
    }).toString()

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?${query}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })

    items.value = response.data.data.docs
    filter.totalPages = response.data.data.totalPages
  } catch (error) {
    console.error('[ERROR] get users:', error?.message || error)
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id) => {
  loading.value = true
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    getUsers()
  } catch (error) {
    console.error('[ERROR] delete user', error?.message || error)
  } finally {
    loading.value = false
  }
}

const handleChangePage = () => {
  getUsers()
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <v-container>
    <div class="d-flex justify-between align-center">
      <h1> User </h1>
      <v-spacer />
      <UserCreate @refetch="getUsers()" />
    </div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="-1">
      <template #[`item.actions`]="{ item }">
        <div class="d-flex ga-2">
          <UserEdit
            :id="item._id"
            @refetch="getUsers()" />
          <ConsentDelete @confirm="deleteUser(item._id)" />
        </div>
      </template>
      <template #bottom>
        <div class="d-flex justify-end pt-2">
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
