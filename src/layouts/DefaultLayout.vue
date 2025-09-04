<script setup>
import Navbar from '../components/Navbar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import Snackbar from '../components/Snackbar.vue';
</script>

<template>
  <v-app>
    <NavigationDrawer />
    <Navbar />
    <v-main>
      <RouterView />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<style scoped>
</style>
