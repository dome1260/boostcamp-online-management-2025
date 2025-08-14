<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import UserCreate from './components/UserCreate.vue'
import UserEdit from './components/UserEdit.vue'
import axios from 'axios'
import { useUserStore } from '../../stores/user'

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

const deleteUser = (item) => {
  //
}

const getUsers = async () => {
  loading.value = true
  try {
    const query = new URLSearchParams({
      page: filter.page,
      limit: filter.limit
    }).toString()

    const response = await axios.get(`http://localhost:3000/users?${query}`, {
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
          <UserEdit />
          <v-btn
            icon
            color="red"
            variant=flat
            size="36"
            @click="deleteUser(item)">
            <v-icon> mdi-trash-can-outline </v-icon>
          </v-btn>
        </div>
      </template>
      <template #bottom>
        <div class="d-flex justify-end">
          <v-pagination
            v-model="filter.page"
            :length="filter.totalPages"
            :total-visible="5" />
          </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
</style>
