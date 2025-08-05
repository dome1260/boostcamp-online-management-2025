<script setup>

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

</script>

<template>
  <v-container>
    <h1> Home </h1>
    <v-data-table
      :headers="headers"
      :items="items">
      <template #[`item.age`]="{ item }">
        {{ item.age }}
      </template>
      <template #[`item.email`]="{ item }">
        email: {{ item.email }}
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
</style>
