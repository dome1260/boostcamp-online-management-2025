<script setup>
import { ref } from 'vue';

import Navbar from '../components/Navbar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import Snackbar from '../components/Snackbar.vue';

const drawer = ref(true)
</script>

<template>
  <v-app>
    <NavigationDrawer v-model="drawer" />
    <Navbar v-model="drawer" />
    <v-main>
      <RouterView />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<style scoped>
</style>
