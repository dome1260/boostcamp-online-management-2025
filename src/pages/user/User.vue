<script setup>
import UserCreate from './components/UserCreate.vue'
import UserEdit from './components/UserEdit.vue'

const headers = [
  {
    title: 'Name',
    value: 'name'
  },
  {
    title: 'Age',
    value: 'age'
  },
  {
    title: 'E-mail',
    value: 'email'
  },
  {
    title: 'Phone Number',
    value: 'phoneNumber'
  },
  {
    title: '',
    value: 'actions'
  }
]

const items = [
  {
    name: 'John Doe',
    age: 20,
    email: 'john@mail.com',
    phoneNumber: '091819232'
  },
  {
    name: 'Jane Doe',
    age: 31,
    email: 'jane@mail.com',
    phoneNumber: '091819232'
  },
  {
    name: 'Mark Doe',
    age: 29,
    email: 'mark@mail.com',
    phoneNumber: '091819232'
  },
  {
    name: 'David Doe',
    age: 21,
    email: 'david@mail.com',
    phoneNumber: '091819232'
  }
]

const deleteUser = (item) => {
  //
}

</script>

<template>
  <v-container>
    <div class="d-flex justify-between align-center">
      <h1> User </h1>
      <v-spacer />
      <UserCreate />
    </div>
    <v-data-table
      :headers="headers"
      :items="items">
      <template #[`item.age`]="{ item }">
        {{ item.age }}
      </template>
      <template #[`item.email`]="{ item }">
        email: {{ item.email }}
      </template>
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
    </v-data-table>
  </v-container>
</template>

<style scoped>
</style>
